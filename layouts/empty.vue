<template>
    <div class="main">
        <slot />
    </div>
</template>

<style>
    html {
        font-size: 16px;
    }

    body {
        color: #0F0F0F;
    }
    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
