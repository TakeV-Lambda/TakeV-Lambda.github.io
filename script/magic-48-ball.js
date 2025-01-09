window.addEventListener("load", async () => {
    try {
	await Scheme.load_main("/magic-48-ball.wasm", {
	    reflect_wasm_dir: '',
	    user_imports: {
		document: {
		    getElementById: (id) => document.getElementById(id),
		},
		element: {
		    setInnerText: (elem, innerText) => elem.innerText = innerText,
		    setInnerHTML: (elem, innerHtml) => elem.innerHTML = innerHtml,
		    setAttribute: (elem, name, value) => elem.setAttribute(name, value),
		    removeAttribute: (elem, name) => elem.removeAttribute(name),
		},
		event: {
		    addEventListener: (target, type, listener) => target.addEventListener(type, listener),
		},
		math: {
		    random: () => Math.random(),
		    floor: (x) => Math.floor(x) 
		}
	    }
	});
    } catch(e) {
	if(e instanceof WebAssembly.CompileError) {
	    document.getElementById("wasm-error").hidden = false;
	}
	throw e;
    }
});
