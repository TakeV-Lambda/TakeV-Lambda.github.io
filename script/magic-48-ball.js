window.addEventListener("load", async () => {
    try {
	await Scheme.load_main("/magic-48-ball.wasm", {
	    reflect_wasm_dir: '',
	    user_imports: {
		document: {
		    getElementById: (id) => document.getElementById(id),
		    createTextNode: Document.prototype.createTextNode.bind(document),
		    createComment: Document.prototype.createComment.bind(document),
		    createElement: Document.prototype.createElement.bind(document),
		    createTreeWalker: Document.prototype.createTreeWalker.bind(document)
		},
		element: {
		    setInnerText: (elem, innerText) => elem.innerText = innerText,
		    setInnerHTML: (elem, innerHtml) => elem.innerHTML = innerHtml,
		    setAttribute: (elem, name, value) => elem.setAttribute(name, value),
		    removeAttribute: (elem, name) => elem.removeAttribute(name),
		    appendChild(parent, child) { return parent.appendChild(child); },
		    remove(elem) { elem.remove(); },
		    replaceWith(oldElem, newElem) { oldElem.replaceWith(newElem); }
		},
		treeWalker: {
		    currentNode(walker) { return walker.currentNode; },
		    setCurrentNode(walker, node) { walker.currentNode = node; },
		    nextNode(walker) { return walker.nextNode(); },
		    firstChild(walker) { return walker.firstChild(); },
		    nextSibling(walker) { return walker.nextSibling(); }
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
