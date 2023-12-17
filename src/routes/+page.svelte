<script lang="ts">
    import { onMount } from "svelte";

    let mesgs: string[] = [];

    onMount(() => {
        let ws = new WebSocket("ws://127.0.0.1:8080");

        ws.onmessage = (e) => {
            console.log(e.data);
        }
    })
</script>

<h1>gh deploy test</h1>