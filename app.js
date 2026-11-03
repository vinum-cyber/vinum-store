/* VINUM STORE PS3 EDITION - JavaScript ES5 */
(function () {
    var libraries = {
        PS3: {
            title: "Biblioteca PlayStation 3",
            description: "Conteudos disponiveis para PS3. Selecione um item para abrir a pagina de download.",
            games: [
                { name: "Minecraft", link: "https://www.mediafire.com/file/wsdzw9da9j0unbk/Minecraft.pkg/file" },
                { name: "Planta vs Zombies", link: "https://www.mediafire.com/file/rdkv2ztr0mon7cw/Planta_vs_zombies.pkg/file" },
                { name: "Gr33 Xcloud", link: "https://www.mediafire.com/file/ixb6566zu0sh2f0/gr33n.pkg/file" }
            ]
        },
        PS2: {
            title: "Biblioteca PlayStation 2",
            description: "Ainda nao ha conteudos cadastrados nesta biblioteca.",
            games: []
        },
        PS1: {
            title: "Biblioteca PlayStation 1",
            description: "Ainda nao ha conteudos cadastrados nesta biblioteca.",
            games: []
        },
        HOMEBREW: {
            title: "Homebrews e aplicativos",
            description: "Ainda nao ha conteudos cadastrados nesta biblioteca.",
            games: []
        }
    };

    function getById(id) {
        return document.getElementById(id);
    }

    function hasClass(element, name) {
        return (" " + element.className + " ").indexOf(" " + name + " ") >= 0;
    }

    function addClass(element, name) {
        if (!hasClass(element, name)) {
            element.className = element.className ? element.className + " " + name : name;
        }
    }

    function removeClass(element, name) {
        var value = " " + element.className + " ";
        while (value.indexOf(" " + name + " ") >= 0) {
            value = value.replace(" " + name + " ", " ");
        }
        element.className = value.replace(/^\s+|\s+$/g, "");
    }

    window.openDetails = function (platform) {
        var item = libraries[platform];
        var list = getById("gameList");
        var i;
        var link;
        var title;
        var label;

        if (!item || !list) {
            return;
        }

        getById("detailsTitle").innerHTML = item.title;
        getById("detailsDescription").innerHTML = item.description;
        getById("detailsIcon").src = "assets/" + platform.toLowerCase() + "-icon.png";
        getById("detailsIcon").alt = "Ícone " + platform;
        list.innerHTML = "";

        if (item.games.length === 0) {
            list.innerHTML = "<p>Nenhum conteudo cadastrado nesta categoria ainda.</p>";
        } else {
            for (i = 0; i < item.games.length; i++) {
                link = document.createElement("a");
                link.href = item.games[i].link;
                link.className = "game-link";
                link.target = "_blank";

                title = document.createElement("h3");
                title.appendChild(document.createTextNode(item.games[i].name));
                link.appendChild(title);

                label = document.createElement("div");
                label.className = "download-label";
                label.appendChild(document.createTextNode("ABRIR DOWNLOAD"));
                link.appendChild(label);

                list.appendChild(link);
            }
        }

        removeClass(getById("detailsModal"), "hidden");
        addClass(getById("detailsModal"), "visible");
        getById("detailsModal").scrollIntoView(true);
    };

    window.closeDetails = function () {
        var modal = getById("detailsModal");
        removeClass(modal, "visible");
        addClass(modal, "hidden");
    };

    function filterCards() {
        var search = getById("gameSearch");
        var cards = document.getElementsByClassName ?
            document.getElementsByClassName("featured-card") :
            document.getElementById("bibliotecas").getElementsByTagName("div");
        var term = search.value.toLowerCase();
        var i;
        var text;
        for (i = 0; i < cards.length; i++) {
            if (hasClass(cards[i], "featured-card")) {
                text = cards[i].innerText || cards[i].textContent || "";
                if (text.toLowerCase().indexOf(term) >= 0) {
                    cards[i].style.display = "block";
                } else {
                    cards[i].style.display = "none";
                }
            }
        }
    }

    var searchField = getById("gameSearch");
    if (searchField) {
        searchField.onkeyup = filterCards;
        searchField.onchange = filterCards;
    }
}());
