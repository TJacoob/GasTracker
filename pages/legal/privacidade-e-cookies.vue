<template>
	<BaseLayout>
		<div slot="content" class="content-position mt-auto my-sm-auto">
			<div class="container-fluid">
				<div class="row justify-content-center">
					<div class="col-12 col-sm-12 col-md-6 col-lg-4">
						<h2 class="text-center font-weight-bold mb-3">Privacidade e Cookies</h2>
						<p>Este website utiliza cookies funcionais para garantir funcionalidades como o estado da sessão. Estes dados são eliminados ao fazer logout da mesma.</p>
						<p>É utilizado o Google Analytics para dados estatisticos e analiticos da interação com o sistema. Não está ativada a funcionalidade "remarketing audiences" pelo que não há registos de navegação do utilizador antes ou após a utilização do website.</p>
						<p>Nenhuma informação pessoal do utilizador é vendida ou transferida para fora do website. Não são enviados emails publicitários.</p>
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
								<nuxt-link to="/legal/termos-e-condicoes">
									<div class="btn-square mx-auto">
										<font-awesome-icon icon="file-contract" class="btn-icon"/>
									</div>
									<span class="text-overflow-center">Termos</span>
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
								<nuxt-link to="/help">
									<div class="btn-square mx-auto">
										<font-awesome-icon icon="question" class="btn-icon"/>
									</div>
									<span class="text-overflow-center">Ajuda</span>
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
	name: "privacidade-e-cookies",
	components: { BaseLayout },
}
</script>

<style scoped>

</style>
