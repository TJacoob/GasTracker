<template>
	<div class="row no-gutters">
		<div class="col-12 col-sm-8 col-md-9">
			<div class="content d-flex large">
				<slot name="content"></slot>
			</div>
		</div>
		<div class="col-12 col-sm-4 col-md-3">
			<div class="navigation short">
				<slot name="navigation"></slot>
			</div>
		</div>
	</div>
</template>

<style>

</style>
