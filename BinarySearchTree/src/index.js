import BinarySearchTreeUI from "./bst-ui";
import BinarySearchTree from "./BinarySearchTree";

const main = () => {
    const tree = new BinarySearchTree();
    tree.insert(11);
    tree.insert(7);
    tree.insert(5);
    tree.insert(3);
    tree.insert(6);
    tree.insert(9);
    tree.insert(8);
    tree.insert(10);
    tree.insert(15);
    tree.insert(12);
    tree.insert(14);
    tree.insert(20);
    tree.insert(18);
    tree.insert(25);
    console.log('inOrderTraverse');
    console.log(tree.inOrderTraverse());
    console.log('preOrderTraverse');
    console.log(tree.preOrderTraverse());
    console.log('postOrderTraverse');
    console.log(tree.postOrderTraverse());
    console.log('min', tree.min());
    console.log('max', tree.max());
    const bstUI = new BinarySearchTreeUI(tree, null, '.tree');
    bstUI.init();
    bstUI.render();
};

main();