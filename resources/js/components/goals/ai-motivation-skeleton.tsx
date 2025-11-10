export function AiMotivationSkeleton() {
    return (
        <div className="flex w-full animate-pulse py-2 text-yellow-300">
            <div className="flex w-full flex-col space-y-3">
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-5 h-2 rounded bg-foreground/70"></div>
                    <div className="col-span-1 h-2 rounded bg-foreground/70"></div>
                </div>
                <div className="h-2 rounded bg-foreground/70"></div>
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-2 h-2 rounded bg-foreground/70"></div>
                    <div className="col-span-4 h-2 rounded bg-foreground/70"></div>
                </div>
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-3 h-2 rounded bg-foreground/70"></div>
                    <div className="col-span-3 h-2 rounded bg-foreground/70"></div>
                </div>
            </div>
        </div>
    );
}
