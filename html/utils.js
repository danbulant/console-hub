function removeChildNodes(node){
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

module.exports = {
    removeChildNodes
}