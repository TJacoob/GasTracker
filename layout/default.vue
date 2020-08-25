<template>
	<div class="row no-gutters">
		<div class="col-12 col-sm-8 col-md-9">
			<div class="content d-flex">
				<slot name="content"></slot>
			</div>
		</div>
		<div class="col-12 col-sm-4 col-md-3">
			<div class="navigation">
				<slot name="navigation"></slot>
			</div>
		</div>
	</div>
</template>

<style>

</style>

<script>
    export default {
        head: {
            title: 'GasTracker🚀',
            meta: [
                { hid: 'description', name: 'description', content: 'GasTracker' },
                { name: 'apple-mobile-web-app-title', content: 'GasTracker' },
                { name: 'application-name', content: 'GasTracker' },
                { name: 'msapplication-TileColor', content: '#ffffff' },
                { name: 'theme-color', content: '#ffffff' },
            ],
			link:[
				{ rel:'apple-touch-icon', sizes:'180x180', href:"/apple-touch-icon.png"},
				{ rel:'icon', type:'image/png', sizes:'32x32', href:"/favicon-32x32.png"},
				{ rel:'icon', type:'image/png', sizes:'16x16', href:"/favicon-16x16.png"},
				{ rel:'manifest', href:"/site.webmanifest"},
				{ rel:'mask-icon', href:"/safari-pinned-tab.svg", color:"#eec149"},
			],
            noscript: [
                { innerHTML: 'Body No Scripts', body: true }
            ],
        }
    }
</script>
