<style>
	ul {
		--string-color: var(--json-tree-string-color, #cb3f41);
		--symbol-color: var(--json-tree-symbol-color, #cb3f41);
		--boolean-color: var(--json-tree-boolean-color, #112aa7);
		--function-color: var(--json-tree-function-color, #112aa7);
		--number-color: var(--json-tree-number-color, #3029cf);
		--label-color: var(--json-tree-label-color, #871d8f);
		--arrow-color: var(--json-tree-arrow-color, #727272);
		--null-color: var(--json-tree-null-color, #8d8d8d);
		--undefined-color: var(--json-tree-undefined-color, #8d8d8d);
		--date-color: var(--json-tree-date-color, #8d8d8d);
		--li-identation: var(--json-tree-li-indentation, 1em);
		--li-line-height: var(--json-tree-li-line-height, 1.3);
		--li-colon-space: 0.3em;
		font-size: var(--json-tree-font-size, 12px);
		font-family: var(--json-tree-font-family, 'Courier New', Courier, monospace);
	}

	ul.dark {
		--string-color: var(--json-tree-string-color, #fa895d);
		--symbol-color: var(--json-tree-symbol-color, #fa895d);
		--boolean-color: var(--json-tree-boolean-color, #9684f8);
		--function-color: var(--json-tree-function-color, #486feb);
		--number-color: var(--json-tree-number-color, #9684f8);
		--label-color: var(--json-tree-label-color, #e971e6);
		--arrow-color: var(--json-tree-arrow-color, #8d8d8d);
		--null-color: var(--json-tree-null-color, #7f7f7f);
		--undefined-color: var(--json-tree-undefined-color, #7f7f7f);
		--date-color: var(--json-tree-date-color, #7f7f7f);
	}

	ul :global(li) {
		line-height: var(--li-line-height);
		display: var(--li-display, list-item);
		list-style: none;
	}

	ul, ul :global(ul) {
		padding: 0;
		margin: 0;
	}
</style>

<script>
	import { setContext } from 'svelte'
	import JSONNode from './JSONNode.svelte'
	import contextKey from './context'

	setContext(contextKey, {})

	export let dark = false
	export let key = '', value
</script>

<ul class:dark {...$$props}>
	<JSONNode {key} {value} isParentExpanded={true} isParentArray={false}/>
</ul>