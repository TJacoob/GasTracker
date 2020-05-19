<template>
	<BaseLayout>
		<div slot="content" class="content-position align-end">
			<div class="container-fluid">
				<div class="row justify-content-center">
					<div class="col-12 col-sm-12 col-md-6 col-lg-4">
						<div v-if="vehicles.length > 0">
							<VueSlickCarousel :arrows="true" :dots="false">
								<div v-for="vehicle in vehicles" class="dashboard-vehicle">
									<img src="~/assets/images/samplecar.png" class="img-fluid px-3" >
									<p class="">{{vehicle.name}}</p>
								</div>
							</VueSlickCarousel>
						</div>
						<div v-else>
							<p>Ainda não adicionou nenhum carro</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div slot="navigation">
			<div class="container-fluid buttons-center">
				<div class="row no-gutters">
					<div class="col-12">
						<div class="buttons-displacement">
							<nuxt-link to="/refuels/add">
								<div class="btn-main">
									<span>Abastecer</span>
								</div>
							</nuxt-link>
						</div>
						<div class="row mt-5 justify-content-center text-center">
							<div class="col-4 col-sm-6 col-md-5 col-lg-4 ">
								<nuxt-link to="/login">
									<div class="btn-square disabled">
										<font-awesome-icon icon="chart-line" class="btn-icon"/>
									</div>
									<span class="text-overflow-center">Consumos</span>
								</nuxt-link>
							</div>
							<div class="w-100 d-none d-sm-block d-lg-none mb-sm-3"></div>
							<div class="col-4 col-sm-6 col-md-5 col-lg-4">
								<nuxt-link to="/vehicles">
									<div class="btn-square">
										<font-awesome-icon icon="car" class="btn-icon"/>
									</div>
									<span class="text-overflow-center">Carros</span>
								</nuxt-link>
							</div>
							<div class="w-100 d-none d-sm-block d-lg-none mb-sm-3"></div>
							<div class="col-4 col-sm-6 col-md-5 col-lg-4 ">
								<nuxt-link to="/profile">
									<div class="btn-square">
										<font-awesome-icon icon="user" class="btn-icon"/>
									</div>
									<span class="text-overflow-center">Perfil</span>
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
    import VueSlickCarousel from 'vue-slick-carousel'

    export default {
        name: "dashboard",
        middleware: 'auth',
        components: { BaseLayout, VueSlickCarousel },
        data(){
            return{
                // Data
                vehicles: [],
                // Control
                error: '',
            };
        },
        mounted(){
            this.$axios.get('/api/vehicles/own/')
			.then(res => {
				this.vehicles = res.data.vehicles;
			})
			.catch(error => {
				this.error = error.response.data.error;
			})
        },
    }
</script>

<style scoped>

</style>
