export default function RevealPresentation({ children }: { children: React.ReactNode }) {
    const deckRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (deckRef.current) {
            Reveal.initialize({
                embedded: true,
                hash: true,
            });
        }
    }, []);

    return (
        <div className="reveal" ref={deckRef}>
    <div className="slides">
        {children}
        </div>
        </div>
);
}