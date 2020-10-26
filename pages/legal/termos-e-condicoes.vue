<template>
	<BaseLayout>
		<div slot="content" class="content-position mt-auto my-sm-auto">
			<div class="container-fluid">
				<div class="row justify-content-center">
					<div class="col-12 col-sm-12 col-md-6 col-lg-4">
						<h2 class="text-center font-weight-bold mb-3">Termos e Condições</h2>
						<p>Este website foi desenvolvido por mim, <a class="text-link" href="https://tjacoob.github.io" target="_blank">Tomás Jacob</a>, a título pessoal. Esta aplicação pretende ser uma ferramenta, disponível online para uso público sem propósitos comerciais.</p>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem culpa deserunt earum, ex illo nesciunt nihil qui, quidem quo quod repellat totam, ullam vel? Atque cupiditate error itaque quo quos!</p>
					</div>
				</div>
			</div>
		</div>
		<div slot="navigation">
			<div class="container-fluid buttons-center">
				<div class="row no-gutters">
					<div class="col-12">
						<div class="buttons-displacement">
							<div class="btn-main" style="visibility: hidden;">
								<span>.</span>
							</div>
						</div>
						<div class="row mt-5 justify-content-center text-center">
							<div class="col-4 col-sm-6 col-md-5 col-lg-4 ">
								<nuxt-link to="/help">
									<div class="btn-square mx-auto">
										<font-awesome-icon icon="question" class="btn-icon"/>
									</div>
									<span class="text-overflow-center">Ajuda</span>
								</nuxt-link>
							</div>
							<div class="col-4 col-sm-6 col-md-5 col-lg-4 ">
								<nuxt-link to="/dashboard">
									<div class="btn-square mx-auto">
										<font-awesome-icon icon="home" class="btn-icon"/>
									</div>
									<span class="text-overflow-center">Homepage</span>
								</nuxt-link>
							</div>
							<div class="col-4 col-sm-6 col-md-5 col-lg-4 ">
								<nuxt-link to="/legal/privacidade-e-cookies">
									<div class="btn-square mx-auto">
										<font-awesome-icon icon="cookie-bite" class="btn-icon"/>
									</div>
									<span class="text-overflow-center">Privacidade</span>
								</nuxt-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</BaseLayout>
</template>

<script>
import BaseLayout from "../../layout/default";

export default {
	name: "termos-e-condicoes",
	components: { BaseLayout },
}
</script>

<style scoped>

</style>
