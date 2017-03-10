/**
 * Created by chen on 17-3-9.
 */

var select = document.querySelector('#select_all');
select.addEventListener('click', select_all);


function select_all()
{
    for(let item of document.querySelectorAll(".tab"))
    {
        console.log(item);
        item.checked = true;

    }
    console.log("i run");
}

var clear = document.querySelector('#clear');
clear.addEventListener('click', clear_all);

function clear_all()
{
    for(let item of document.querySelectorAll(".tab"))
    {
        item.checked = false;
        console.log(item);
    }
    console.log("i run");
}



function get_selected_items()
{
    window.selected_items = [];
    for(let item of document.querySelectorAll(".tab"))
    {
        if(item.checked)
        {
            let index = item.value;
            window.selected_items.push(window.tabs[index]);
        }

    }
}
var submit = document.querySelector('#submit');
submit.addEventListener('click', submit_tabs);
function submit_tabs()
{
    get_selected_items();
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://api.cjhang.com/v1/posttitles/", true);
    var data = JSON.stringify(window.selected_items);
    xmlHttp.send(data);
    console.log(window.tabs);
    console.log(window.selected_items);
}

function copyToClipboard(text)
{
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}
var copy = document.querySelector('#copy');
copy.addEventListener('click', copy_tabs);
function copy_tabs()
{
    get_selected_items();
    copyToClipboard(JSON.stringify(window.selected_items));
}


try
{
    browser.tabs.query({}).then(showAllTabs);
}
catch(e)
{
    if(e.name == "ReferenceError")
    {
        chrome.tabs.query({}, showAllTabs);
    }
}

function showAllTabs(tabs)
{
    window.tabs = [];
    var container = document.querySelector("#tabs");
    for(let [i, tab] of tabs.entries())
    {
        let url = tab.url;
        let title = tab.title;
        window.tabs.push({title: title, url: url});
        var div = document.createElement('div');
        var input = document.createElement('input');
        input.setAttribute("class", "tab");
        input.setAttribute("type", "checkbox");
        input.setAttribute("checked", "true");
        input.setAttribute("id", "tab"+i);
        input.setAttribute("value", i);
        var label = document.createElement("label");
        label.setAttribute("for", "tab"+i);
        label.innerHTML = title;
        var toggle = document.createElement('button');
        toggle.innerHTML = "toggle";
        toggle.setAttribute("id", tab.id);
        toggle.addEventListener('click', toggle_tab);
        div.appendChild(input);
        div.appendChild(label);
        div.appendChild(toggle);
        container.appendChild(div)
    }
}

function toggle_tab(e)
{
    var target = e.target;
    var index = target.id;
    chrome.tabs.update(parseInt(index), {
              active: true
          });
}