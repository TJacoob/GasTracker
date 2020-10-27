<template>
	<BaseLayout>
		<div slot="content" class="content-position my-auto">
			<div class="container-fluid">
				<div class="row">
					<div class="col-12 text-center">
						<img src="~/assets/images/logo.png" class="img-fluid" >
						<h4 class="font-weight-bold">
							<a href="/help" class="text-link">Como funciona?</a>
						</h4>
					</div>
				</div>
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
