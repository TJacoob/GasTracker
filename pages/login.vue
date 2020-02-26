<template>
	<BaseLayout>
		<div slot="content">
			<div class="container-fluid">
				<div class="row align-items-end">
					<div class="col-12">
						<p>Lorem</p>
					</div>
				</div>
			</div>
		</div>
		<div slot="navigation">
			<div class="container-fluid buttons-center">
				<div class="row no-gutters">
					<div class="col-12">
						<div class="buttons-displacement">
							<div class="btn-main">
								<span>Entrar</span>
							</div>
							<span class="f-gray lh-sm">
								<small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis deleniti enim necessitatibus nostrum officia officiis repellendus voluptate? Autem eum illo labore molestiae mollitia sit unde voluptas? Impedit iure reiciendis ullam!</small>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</BaseLayout>
</template>

<script>
    import BaseLayout from '../layout/default';

    export default {
        name: "login",
        components: { BaseLayout },
    }
</script>

<style scoped>

</style>
