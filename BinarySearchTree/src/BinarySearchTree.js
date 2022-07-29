class Node {
    constructor(value, right = null, left = null) {
        this.value = value;
        this.right = right;
        this.left = left;
    }
    // get isLeaf() {
    //     return this.right === null && this.left === null;
    // }
    // get hasChildren() {
    //     return !this.isLeaf;
    // }
    getLeft() {
        return this.left;
    }
    setLeft(left) {
        this.left = left;
    }
    getRight() {
        return this.right;
    }
    setRight(right) {
        this.right = right;
    }
    setValue(value) {
        this.value = value;
    }
}
class BinarySearchTree {
    constructor() {
        this.root = null;
        this.nodeCount = 0;
    }
    isEmpty() {
        return this.size() == 0;
    }
    size() {
        return this.nodeCount;
    }
    height(node = this.root) {
        const heightRecursive = (current) => {
            if (current == null) return 0;
            return 1 + Math.max(heightRecursive(current.left), heightRecursive(current.right));
        }
        return heightRecursive(node);
    }
    insert(value) {
        const newNode = new Node(value);
        const insertRecursive = (current) => {
            if (value < current.value) {
                if (current.getLeft() != null) {
                    insertRecursive(current.getLeft());
                } else {
                    current.setLeft(newNode);
                    this.nodeCount++;
                }
            } else if (value > current.value) {
                if (current.getRight() != null) {
                    insertRecursive(current.getRight());
                } else {
                    current.setRight(newNode);
                    this.nodeCount++;
                }
            }
        };
        if (this.root === null) {
            this.root = newNode;
            this.nodeCount++;
        } else {
            insertRecursive(this.root);
        }
    }
    remove(val, node = this.root) {
        if (!node) {
            return null;
        }

        if (val < node.value) {
            node.left = this.remove(val, node.left);
        } else if (val > node.value) {
            node.right = this.remove(val, node.right);
        } else {
            if (!node.left) {
                return node.right;
            } else if (!node.right) {
                return node.left;
            } else {
                node.value = this.min(node.right);
                node.right = this.remove(node.value, node.right);
            }
        }
        return node;

    }
    search(value) {
        return this.postOrderTraverse().find((node) => node.value === value);
    }
    min(node = this.root) {
        let current = node;
        while (current !== null && current.left !== null) {
            current = current.left;
        }
        return current.value;
    }
    max(node = this.root) {
        let current = node;
        while (current !== null && current.right !== null) {
            current = current.right;
        }
        return current.value;
    }
    inOrderTraverse(node = this.root, traversed = []) {
        if (node === null) {
            return traversed;
        }
        if (node.left) {
            traversed.push(...this.inOrderTraverse(node.left));
        }
        traversed.push(node);
        if (node.right) {
            traversed.push(...this.inOrderTraverse(node.right));
        }
        return traversed;
    }
    preOrderTraverse(node = this.root, traversed = []) {
        if (node === null) {
            return traversed;
        }
        traversed.push(node);
        if (node.left) {
            traversed.push(...this.preOrderTraverse(node.left));
        }
        if (node.right) {
            traversed.push(...this.preOrderTraverse(node.right));
        }
        return traversed;
    }
    postOrderTraverse(node = this.root, traversed = []) {
        if (node === null) {
            return traversed;
        }
        if (node.left) {
            traversed.push(...this.postOrderTraverse(node.left));
        }
        if (node.right) {
            traversed.push(...this.postOrderTraverse(node.right));
        }
        traversed.push(node);
        return traversed;
    }

}
// var node = new BinarySearchTree();
// node.insert(5);
// node.insert(3);
// node.insert(6);
// node.insert(1);
// node.insert(8);
// node.insert(4);

// console.log(node.search(4));
// // console.log(node.isEmpty());
// // console.log(node.size());
// // console.log(node.height());
// // console.log(node.min());
// // console.log(node.max());
// console.log(node.nodeCount);
// console.log(node.postOrderTraverse());
export default BinarySearchTree;