<template>
	<BaseLayout>
		<div slot="content" class="content-position my-auto">
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
						<div class="col-12 col-sm-12 col-md-6 col-lg-4 text-center">
							<div v-if="this.refuel!==null">
								<span class="d-block f-gray mb-0">o seu consumo desde o último abastecimento:</span>
								<h1 class="font-weight-bold mb-0">{{consumption.toFixed(2)}}</h1>
								<span class="d-block">litros por 100km</span>
								<div class="mb-5"></div>
								<h2 class="font-weight-bold mb-0"
									:class="{'f-success':balance<=0,'f-danger':balance>0}">
									<font-awesome-icon v-if="balance>0" icon="angle-up" class="btn-icon fa-xs"/>
									<font-awesome-icon v-if="balance<=0" icon="angle-down" class="btn-icon fa-xs"/>
									{{balance.toFixed(1)}}
									<span class="font-weight-light smaller">%</span>
								</h2>
								<span v-if="balance>0" class="d-block">acima da sua média</span>
								<span v-if="balance<=0" class="d-block">abaixo da sua média</span>
								<div class="mb-5"></div>
								<span class="d-block f-gray mb-0">o seu consumo médio</span>
								<h2 class="font-weight-bold mb-1">{{vehicle.consumption.toFixed(2)}}</h2>
								<span class="d-block">litros por 100km</span>
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
							<div class="btn-main" style="visibility: hidden;">
								<span>.</span>
							</div>
						</div>
						<div class="row mt-5 justify-content-start text-center">
							<div class="col-4 col-sm-6 col-md-5 col-lg-4">
								<nuxt-link to="/refuels" :event="this.loaded?'click':''">
									<div class="btn-square mx-auto" :class="{'disabled':!this.loaded}">
										<font-awesome-icon icon="list" class="btn-icon"/>
									</div>
									<span class="text-overflow-center">Consumos</span>
								</nuxt-link>
							</div>
							<div class="col-4 col-sm-6 col-md-5 col-lg-4">
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
        name: "refuelSummary",
        middleware: 'auth',
        components: { BaseLayout },
        data(){
            return {
                vehicle: null,
                refuel: null,
                //Request Controller
                error: null,
				loaded: false,
            }
        },
        mounted() {
            this.$axios.get('/api/profiles/favorite/')
			.then(res => {
				this.vehicle = res.data.vehicle;
				if( this.vehicle === undefined )
					this.$router.push({path: '/dashboard'})
				else
					this.$axios.get('/api/refuels/_'+this.vehicle.license+'/latest/')
						.then(res => {
							this.refuel = res.data.refuel;
							if( this.refuel === undefined )
								this.$router.push({path: '/refuels'})
							this.loaded = true;
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
          	  	return ((100*this.refuel.quantity)/this.refuel.kilometers);
			},
			balance: function (){
				return ((this.consumption*100)/this.vehicle.consumption)-100;
			},
		},
    }
</script>

<style scoped>

</style>
