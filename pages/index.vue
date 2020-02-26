<template>
	<BaseLayout>
		<div slot="content">
			<div class="container-fluid">
				<p>Lorem</p>
			</div>
		</div>
		<div slot="navigation">
			<div class="container-fluid buttons-center">
				<div class="row no-gutters">
					<div class="col-12 text-center">
						<div class="buttons-displacement">
							<nuxt-link to="/login">
								<div class="btn-main">
									<span>Entrar</span>
								</div>
							</nuxt-link>
							<p>ou</p>
							<nuxt-link to="/signup">
								<div class="btn-main">
									<span>Criar Conta</span>
								</div>
							</nuxt-link>
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
        name: "index",
        components: { BaseLayout },
    }
</script>

<style>

</style>
