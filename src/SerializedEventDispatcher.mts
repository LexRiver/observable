import { TypeEvent, TypeEventResult } from '@lexriver/type-event'

type EventHandler = (...args:any[])=>TypeEventResult

export class SerializedEventDispatcher {
    public readonly eventOnError = new TypeEvent<(error:unknown)=>void>()

    private queue:Array<()=>Promise<void>> = []
    private isDispatching = false
    private idlePromise:Promise<void> = Promise.resolve()
    private resolveIdle:()=>void = () => undefined

    dispatch<F extends EventHandler>(event:TypeEvent<F>, ...args:Parameters<F>):void {
        this.queue.push(() => event.triggerAsync(...args))
        if(this.isDispatching) return

        this.isDispatching = true
        this.idlePromise = new Promise(resolve => {
            this.resolveIdle = resolve
        })
        void this.drain()
    }

    waitForEvents():Promise<void> {
        return this.idlePromise
    }

    private async drain():Promise<void> {
        while(this.queue.length>0){
            const trigger = this.queue.shift()!
            try {
                await trigger()
            } catch(error){
                try {
                    await this.eventOnError.triggerAsync(error)
                } catch(errorHandlerError){
                    console.error('Observable event error handler failed', errorHandlerError)
                }
            }
        }

        this.isDispatching = false
        this.resolveIdle()
    }
}
