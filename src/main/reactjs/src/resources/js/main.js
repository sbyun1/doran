window.onload = function () {
    let _products = document.querySelectorAll('.product-figure');

    _products.forEach(_product => {
        let _item = Array.from(_product.getElementsByClassName('item-info'))[0];
        let _item_name = Array.from(_item.getElementsByClassName('item-name'))[0]
        let _item_details = Array.from(_product.getElementsByClassName('item-details'))[0];

        if (_item_name != undefined) {
            _item_name.addEventListener('click', function (e) {
                _item_details.classList.toggle('shown');
            });
        }

        if (_item_details != undefined) {
            let _close = Array.from(_item_details.getElementsByClassName('close'))[0];

            if (_close != undefined) {
                _close.addEventListener('click', function (e) {
                    _item_details.classList.toggle('shown');
                });
            }
        }
    });
}
