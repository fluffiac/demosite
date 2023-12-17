// place files you want to import through the `$lib` alias in this folder.

async function ws(addr: string): Promise<WebSocket> {
    let ws = new WebSocket(addr);

    return new Promise((res, rej) => {
        ws.onopen = () => res(ws)
        ws.onerror = () => rej()
    })
}

async function repeat<T>(p: () => Promise<T>): Promise<T> {
    return p().catch(_ => repeat(p))
}



export class SparrowSocket {
    ws = repeat(() => ws("ws://127.0.0.1:8666")).then((ws) => this.sockinit(ws))

    onopen = () => {}
    onclose = () => {}
    onmesg = (mesg: string) => {}

    sockinit(sock: WebSocket) {
        this.onopen();

        const reinit = () => {
            this.onclose();
            this.ws = repeat(() => ws("ws://127.0.0.1:8666")).then((ws) => this.sockinit(ws))
        }

        sock.onclose = reinit;
        sock.onmessage = (e) => this.onmesg(e.data);
    }
}