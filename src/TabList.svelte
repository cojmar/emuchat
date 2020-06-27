<style>
	:global(.tab-list) {
		position: relative;
		height: 28px;
		border: 1px solid #7d7d7d;
		padding-top: 2px;
		padding-bottom: 2px;
		margin-bottom: 2px;
		overflow-x: hidden;
		overflow-y: hidden;
		white-space: nowrap;

		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	:global(.tab-list:hover) {
		overflow-x: auto;
	}

	:global(.tab-list::-webkit-scrollbar) {
		width: 5px;
		height: 5px;
	}

	:global(.tab-list::-webkit-scrollbar-track) {
		background: rgba(34, 33, 33, 0.95);
	}

	:global(.tab-list::-webkit-scrollbar-thumb) {
		background: rgba(0, 0, 0, 0.38);
	}

	:global(.tab-list::-webkit-scrollbar-thumb:hover) {
		background: rgba(0, 0, 0, 0.64);
	}
</style>

<div class="tab-list">
	<slot/>
</div>