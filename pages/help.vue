<template>
	<BaseLayout>
		<div slot="content" class="content-position mt-auto my-sm-auto">
			<div class="container-fluid">
				<div class="row justify-content-center">
					<div class="col-12 col-sm-12 col-md-6 col-lg-4">
						<h1 class="text-center font-weight-bold mb-3">Gastracker</h1>
						<p>O Gastracker é uma aplicação simples para controlar os consumos do teu carro, porque nem todos os carros o fazem automaticamente.</p>
						<p>Para usares esta aplicação basta preencher a informação de cada vez que abasteces o teu carro. Os valores são registados e os consumos calculados automaticamente. Podes ver a média de consumo para cada veículo e as mudanças a cada abastecimento.</p>
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
import BaseLayout from "../layout/default";

export default {
	name: "help",
	components: { BaseLayout },
}
</script>

<style scoped>

</style>
