(() => {
    const _LEVELS = {ONE: "one", THREE: "three", FIVE: "five"};
    const _LEVELS_ARR = $.map(_LEVELS, (level) => level);
    const _WEIGHTS = {[_LEVELS.ONE]: 30, [_LEVELS.THREE]: 15, [_LEVELS.FIVE]: 5}
    let _contentDiv, _contentList, _contentForm;
    let _items;
    let _done = 0;

    const _ = {
        celebrate: () => {
            if (_done === 100) {
                document.writeln("DONEZO");
            }
            return true;
        },
        display: () => {
            return _.validItems(_items) && $.each(_items, (i, item) => _.displayItem(item)) && _.displayForm(false) && _.updateDoneClock();
        },
        displayForm: (show) => {
            return show ? _contentDiv.hide() && _contentForm.show() : _contentDiv.show() && _contentForm.hide();
        },
        displayItem: (item) => {
            let thisItem = item;
            let itemDiv = _.getItemDiv(item);
            itemDiv.click((e) => {
                let item = $(e.target);
                return !item.hasClass("done") && item.addClass("done") && _.moveToDone(thisItem);
            });
            _contentList.append(itemDiv);
            return itemDiv;
        },
        getItemDiv: (item) => {
            return $("<div></div>", {
                html: item.name,
                class: `item ${item.level}`,
            });
        },
        init: () => {
            _contentForm = $("#form");
            _contentDiv = $("#todo");
            _contentList = $("#content");
            _items = [];

            $("#btnDisplay").click(() => {
                _items = [];
                $("input").each((i, input) => {
                   _items.push({
                       level: input.placeholder.toLowerCase(),
                       name: input.value,
                   }); 
                });

                if (!_.display()) {
                    alert("Are you sure you filled in all 9 slots?");
                };
            });

            _.displayForm(true);
        },
        moveToDone: (item) => {
            _done += _WEIGHTS[item.level];
            console.log(_done);
            _.updateDoneClock();
        },
        updateDoneClock: () => {
            return $(".clockValue").html(`${_done}%`) && $(".clockFill").css("width", _done + "%") && _.celebrate();
        },
        validItems: (items) => {
            if (!items || items.length != 9) return;
            let levels = $.map(items, (item) => item.level);
            let levelMap = {};
            $.each(levels, (i, level) => {
                if (_LEVELS_ARR.indexOf(level) < 0) return false;
                levelMap[level] = (levelMap[level] || 0) + 1;
            });

            return levelMap[_LEVELS.ONE] === 1 &&
                   levelMap[_LEVELS.THREE] === 3 &&
                   levelMap[_LEVELS.FIVE] === 5;
        },
    };
    
    $(document).ready(() => {
        _.init();
    })
})();