<template>
	<BaseLayout>
		<div slot="content" class="content-position align-end">
			<div class="container-fluid">
				<div class="row justify-content-center">
					<div class="col-12 col-sm-12 col-md-6 col-lg-4">
						<p v-if="$auth.loggedIn">Hello {{$auth.user.username}}!</p>
						<p v-else>Hello stranger</p>
						<div @click="$auth.logout()">Logout</div>
					</div>
				</div>
			</div>
		</div>
		<div slot="navigation">
			<div class="container-fluid buttons-center">
				<div class="row no-gutters">
					<div class="col-12">
						<div class="buttons-displacement">
							<div class="btn-main disabled" >
								<span>Abastecer</span>
							</div>
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
								<nuxt-link to="/login" :disabled="disable">
									<div class="btn-square disabled">
										<font-awesome-icon icon="gas-pump" class="btn-icon"/>
									</div>
									<span class="text-overflow-center">Abastecimentos</span>
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

    export default {
        name: "dashboard",
        middleware: 'auth',
        components: { BaseLayout },
    }
</script>

<style scoped>

</style>
