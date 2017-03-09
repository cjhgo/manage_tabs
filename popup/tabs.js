/**
 * Created by chen on 17-3-9.
 */

var btn = document.querySelector('.tab');
btn.addEventListener('click', click_tab);


function click_tab()
{
    console.log("i run");
}

function getActiveTab() {
  return browser.tabs.query({});
}
getActiveTab().then(showAllTabs);
var btn = document.querySelector('.tab');
btn.addEventListener('click', click_tab);

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
        var a = document.createElement('a');
        a.setAttribute("href", url);
        a.setAttribute("title", title);
        a.innerHTML = title;
        var btn = document.createElement("button");
        btn.setAttribute("class", "tab");
        btn.setAttribute("id", "tab"+i);
        btn.addEventListener('click', function (e) {
            var tar = e.target;
            console.log(tar);
        });
        div.appendChild(a);
        div.appendChild(btn);
        container.appendChild(div)
    }
}
