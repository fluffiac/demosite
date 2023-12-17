<script lang="ts">
    import { SparrowSocket } from "$lib";
    import { onMount } from "svelte";
    

    let mesgs: string[] = [];

    function push(mesg: string) {
        console.log(mesg);
        mesgs.push(mesg);
        mesgs = mesgs;
    }

    onMount(() => {
        let sock = new SparrowSocket();

        sock.onmesg = (mesg) => push(mesg)
        sock.onopen = () => push('SocketOpen')
        sock.onclose = () => push('SocketClose')
    })
</script>

<button on:click={() => mesgs = []}>Clear</button>
{#each mesgs as mesg}
    <p>{mesg}</p>
{/each}

<style>
    p {
        margin: 0;
        white-space: nowrap
    }
</style>