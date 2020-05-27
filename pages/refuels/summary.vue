<template>
	<BaseLayout>
		<div slot="content" class="content-position align-end">
			<div class="container-fluid">
				<div v-if="this.refuel!==null">
					<p>Consumo deste Ababastecimento: {{consumption}} l/100km</p>
					<p>Consumo do Carro: {{vehicle.consumption.toFixed(2)}} l/100km</p>
				</div>
			</div>
		</div>
		<div slot="navigation">
			<div class="container-fluid buttons-center">
				<div class="row no-gutters">
					<div class="col-12">
						<div class="row mt-5 justify-content-center text-center">
							<div class="col-4 col-sm-6 col-md-5 col-lg-4 ">
								<nuxt-link to="/dashboard">
									<div class="btn-square">
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
        name: "refuelSummary",
        middleware: 'auth',
        components: { BaseLayout },
        data(){
            return {
                vehicle: null,
                refuel: null,
                //Request Controller
                error: null,
            }
        },
        mounted() {
            this.$axios.get('/api/profiles/favorite/')
			.then(res => {
				this.vehicle = res.data.vehicle;
                this.$axios.get('/api/refuels/_'+this.vehicle.license+'/latest/')
                    .then(res => {
                        this.refuel = res.data.refuel;
                        console.log(this.refuel);
                    })
                    .catch(error => {
                        this.error = error.response.data.error;
                    })
			})
			.catch(error => {
				this.error = error.response.data.error;
			});
        },
		computed:{
          	consumption: function(){
          	    console.log(this.refuel.quantity);
          	    console.log(this.refuel.kilometers);
          	  	return ((100*this.refuel.quantity)/this.refuel.kilometers);
			},
		},
    }
</script>

<style scoped>

</style>
