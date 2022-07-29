export const defaultBSTUIConfig = {
    HIGHLIGHT_CLASS: 'node__element--highlight',
    HIGHLIGHT_TIME: 300,
};
class BinarySearchTreeUI {
    highlightTimer = null;
    actionsContainerSelector;
    constructor(
        tree,
        render,
        treeContainerSelector = ".tree",
        actionsContainerSelector = "bst-actions-container",
        config = {
            HIGHLIGHT_CLASS: 'node__element--highlight',
            HIGHLIGHT_TIME: 500,
        }
    ) {
        this.treeContainerSelector = treeContainerSelector;
        this.actionsContainerSelector = actionsContainerSelector;
        this.config = config;
        this.tree = tree;
        this.render = render || this.renderTree;
        const root = document.documentElement;
        root.style.setProperty(
            '--animation-timing',
            `${this.config.HIGHLIGHT_TIME / 1000}s`
        )
    }
    traverseUINodes(nodes) {
        nodes.reduce((pr, node) => {
            return pr.then(() => this.highlightNode(node.value));
        }, Promise.resolve());
    }
    getTreeUI(node) {
        const { left, right, value } = node;
        if (!node) {
            return '';
        }
        return `
          <div class="node__element" data-node-id="${value}">${value}</div>
          ${left || right
                ? `
                <div class="node__bottom-line"></div>
                <div class="node__children">
                <div class="node node--left">
                  ${left ? this.getTreeUI(left) : ''}
                </div>
                <div class="node node--right">
                  ${right ? this.getTreeUI(right) : ''}
                </div>
                </div>
              `
                : ''
            }
        `;
    }
    renderTree(
        node = this.tree.root,
        containerSelector = this.treeContainerSelector
    ) {
        const treeContainer = document.querySelector(containerSelector);
        if (!node) {
            return (treeContainer.innerHTML = '');
        }
        const template = this.getTreeUI(node);
        treeContainer.innerHTML = template;
    }
    highlightNode(value) {
        const nodeElement = document.querySelector(`[data-node-id="${value}"]`);
        if (this.highlightTimer !== null) {
            clearTimeout(this.highlightTimer);
            nodeElement.classList.remove(this.config.HIGHLIGHT_CLASS);
            this.highlightTimer = null;
            return;
        }
        nodeElement.classList.add(this.config.HIGHLIGHT_CLASS);
        document.querySelectorAll('button').forEach((btn) => {
            btn.setAttribute('disabled', true);
        });
        return new Promise((resolve) => {
            this.highlightTimer = setTimeout(() => {
                nodeElement.classList.remove(this.config.HIGHLIGHT_CLASS);
                document.querySelectorAll('button').forEach((btn) => {
                    btn.removeAttribute('disabled');
                });
                this.highlightTimer = null;
                resolve();
            }, this.config.HIGHLIGHT_TIME);
        });
    }
    onHeightTreeBtnClick() {
        const heightOfTree = this.tree.height();
        if (heightOfTree) {
            alert("Height of tree is " + heightOfTree);
        }
        else {
            alert("There is no tree");
        }
    }
    onRemoveElementBtnClick() {
        const element = prompt('Enter element to remove from the tree');
        const removedEl = this.tree.remove(parseInt(element));
        if (removedEl) {
            this.render(this.tree.root);
        } else {
            alert('Element not found');
        }
    }
    onInsertBtnClick() {
        const element = prompt('Enter element to add to tree');
        if (!element) {
            return;
        }
        const node = this.tree.insert(parseInt(element));
        this.render(this.tree.root);
    }
    onMinValueBtnClick() {
        const minValue = this.tree.min();
        if (minValue) {
            this.highlightNode(minValue);
        } else {
            alert('Node not found');
        }
    }
    onMaxValueBtnClick() {
        const maxValue = this.tree.max();
        if (maxValue) {
            this.highlightNode(maxValue);
        } else {
            alert('Node not found');
        }
    }
    onSearchBtnClick() {
        const searchVal = prompt('Enter the node value to search in the tree');
        const searchedNode = this.tree.search(parseInt(searchVal));
        if (searchedNode) {
            this.highlightNode(searchedNode.value);
        } else {
            alert('Node not found');
        }
    }
    onPreOrderTravBtnClick() {
        const array = this.tree.preOrderTraverse();
        this.traverseUINodes(array);
        console.log(array);
    }

    onInOrderTravBtnClick() {
        const array = this.tree.inOrderTraverse();
        this.traverseUINodes(array);
        console.log(array);
    }

    onPostOrderTravBtnClick() {
        const array = this.tree.postOrderTraverse();
        this.traverseUINodes(array);
        console.log(array);
    }
    onResetBtnClick() {
        this.tree.root = null;
        this.render(this.tree.root);
    }
    init() {
        const height = document.querySelector('#heightTreeBtn');
        const insert = document.querySelector('#insertBtn');
        const removeElementBtn = document.querySelector('#removeElementBtn');
        const minValueBtn = document.querySelector('#minValueBtn');
        const maxValueBtn = document.querySelector('#maxValueBtn');
        const searchBtn = document.querySelector('#searchBtn');
        const preOrderTravBtn = document.querySelector('#preOrderTravBtn');
        const inOrderTravBtn = document.querySelector('#inOrderTravBtn');
        const postOrderTravBtn = document.querySelector('#postOrderTravBtn');
        const resetBtn = document.querySelector('#resetBtn');
        height.addEventListener('click', this.onHeightTreeBtnClick.bind(this));
        removeElementBtn.addEventListener(
            'click',
            this.onRemoveElementBtnClick.bind(this)
        );
        insert.addEventListener('click', this.onInsertBtnClick.bind(this));
        minValueBtn.addEventListener('click', this.onMinValueBtnClick.bind(this));
        maxValueBtn.addEventListener('click', this.onMaxValueBtnClick.bind(this));
        searchBtn.addEventListener('click', this.onSearchBtnClick.bind(this));
        preOrderTravBtn.addEventListener(
            'click',
            this.onPreOrderTravBtnClick.bind(this)
        );
        inOrderTravBtn.addEventListener(
            'click',
            this.onInOrderTravBtnClick.bind(this)
        );
        postOrderTravBtn.addEventListener(
            'click',
            this.onPostOrderTravBtnClick.bind(this)
        );
        resetBtn.addEventListener('click', this.onResetBtnClick.bind(this));
    }
}
export default BinarySearchTreeUI;