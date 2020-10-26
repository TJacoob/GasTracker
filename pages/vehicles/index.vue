<template>
	<BaseLayout>
		<div slot="content" class="content-position mt-auto my-sm-auto">
			<div class="container-fluid">
				<transition name="fade">
					<div v-show="!loaded" class="loading-screen">
						<div class="my-auto">
							<font-awesome-icon icon="circle-notch" class="fa-4x f-secondary fa-spin"/>
						</div>
					</div>
				</transition>
				<transition name="fade">
					<div v-show="loaded" class="row justify-content-center">
						<div class="col-12 col-sm-12 col-md-6 col-lg-4">
							<div v-if="this.vehicles.length===0" class="text-center">
								<p>Adicione um carro antes de registar um abastecimento</p>
							</div>
							<div class="vehicle-card" v-for="vehicle in vehicles">
								<div class="row">
									<div class="col-auto align-self-center">
										<font-awesome-icon icon="car" class="fa-2x"/>
									</div>
									<div class="col p-0 align-self-center">
										<span>{{vehicle.license}}</span>
										<span class="font-weight-bold">{{vehicle.name}}</span>
									</div>
									<div class="col-auto align-self-center text-center">
										<span>Consumo:</span>
										<span class="font-weight-bold">{{vehicle.consumption.toFixed(2)}}L / 100</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
		</div>
		<div slot="navigation">
			<div class="container-fluid buttons-center">
				<div class="row no-gutters">
					<div class="col-12">
						<div class="buttons-displacement">
							<nuxt-link to="/vehicles/add">
								<div class="btn-main">
									<span>Registar Carro</span>
								</div>
							</nuxt-link>
						</div>
						<div class="row mt-5 justify-content-center text-center">
							<div class="col-4 col-sm-6 col-md-5 col-lg-4 ">
								<nuxt-link to="/dashboard">
									<div class="btn-square mx-auto">
										<font-awesome-icon icon="home" class="btn-icon"/>
									</div>
									<span class="text-overflow-center">Homepage</span>
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
        name: "index",
        middleware: 'auth',
        components: { BaseLayout },
		data(){
            return{
                // Data
              	vehicles: [],
				// Control
				error: '',
				loaded: false,
			};
		},
		mounted(){
            this.$axios.get('/api/vehicles/own/')
                .then(res => {
                    this.vehicles = res.data.vehicles;
                    this.loaded = true;
                })
                .catch(error => {
                    this.error = error.response.data.error;
                })

		},
    }
</script>

<style scoped>

</style>
