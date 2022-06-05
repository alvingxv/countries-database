<script>
    import Nav from "../components/nav.svelte";
    import Footer from "../components/footer.svelte";
</script>
<div class="flex flex-col h-screen">
    <Nav/>
    <slot></slot>
    <Footer/>
</div>


<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>