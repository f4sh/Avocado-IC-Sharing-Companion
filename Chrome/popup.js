document.addEventListener('DOMContentLoaded', function () {
    function checkSearchQuery() {
        const searchQuery = document.getElementById('searchQuery').value.trim();
        const searchButton = document.querySelector('button[type="submit"]');
        searchButton.disabled = searchQuery === '';
    }
    checkSearchQuery();
    document.getElementById('searchQuery').addEventListener('input', checkSearchQuery);
    document.getElementById('searchForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const searchQuery = document.getElementById('searchQuery').value.trim();
        const project = document.querySelector('input[name="project"]:checked').value;
        const status = document.getElementById('status').value;
        const severity = document.getElementById('severity').value;
        const reportDate = document.getElementById('reportDate').value;
        const encodedSearchQuery = encodeURIComponent(searchQuery);
        let searchURL = `https://issue-council.robertsspaceindustries.com/projects/${project}/issues?search=${encodedSearchQuery}&statuses=${status}&severities=${severity}&openedOn=${reportDate}`;
        chrome.tabs.create({ url: searchURL });
    });
    const createIssueButton = document.getElementById('createIssue');
    if (createIssueButton) {
        createIssueButton.addEventListener('click', function () {
            const selectedProject = document.querySelector('input[name="project"]:checked').value;
            let createIssueURL;
            if (selectedProject === 'STAR-CITIZEN') {
                createIssueURL = 'https://issue-council.robertsspaceindustries.com/projects/STAR-CITIZEN/issues/create';
            } else if (selectedProject === 'LAUNCHER') {
                createIssueURL = 'https://issue-council.robertsspaceindustries.com/projects/LAUNCHER/issues/create';
            }
            chrome.tabs.create({ url: createIssueURL });
        });
    }
    function updateNavigationLinks() {
        const selectedProject = document.querySelector('input[name="project"]:checked').value;
        const baseURI = `https://issue-council.robertsspaceindustries.com/projects/${selectedProject}`;
        const links = ['my-ReportsLink', 'my-ContributionsLink', 'followed-IssuesLink'];
        links.forEach(linkId => {
            const linkElement = document.getElementById(linkId);
            linkElement.href = `${baseURI}/${linkId.replace('Link', '').toLowerCase()}`;
            linkElement.removeEventListener('click', openLinkInNewTab);
            linkElement.addEventListener('click', openLinkInNewTab);
        });
    }
    function openLinkInNewTab(event) {
        event.preventDefault();
        chrome.tabs.create({ url: this.href });
    }
    const projectRadios = document.querySelectorAll('input[name="project"]');
    projectRadios.forEach(radio => {
        radio.addEventListener('change', updateNavigationLinks);
    });
    updateNavigationLinks();
    const year = new Date().getFullYear();
    const footer = document.querySelector('.footer');
    footer.textContent = '';
    const copyrightText = document.createTextNode(`\u00A9 ${year} Avocado IC Sharing Companion | `);
    footer.appendChild(copyrightText);
    const patchNotesLink = document.createElement('a');
    patchNotesLink.href = "https://robertsspaceindustries.com/spectrum/community/AVOCADO/forum/31515/thread/introducing-the-avocado-ic-sharing-companion-strea";
    patchNotesLink.textContent = "Release Notes";
    patchNotesLink.target = "_blank";
    patchNotesLink.rel = "noopener noreferrer";
    footer.appendChild(patchNotesLink);
    footer.appendChild(document.createElement('br'));
    const firefoxAddonLink = document.createElement('a');
    firefoxAddonLink.href = "https://addons.mozilla.org/en-US/firefox/addon/avocado-ic-sharing-companion/";
    firefoxAddonLink.textContent = "Firefox Add-on";
    firefoxAddonLink.target = "_blank";
    firefoxAddonLink.rel = "noopener noreferrer";
    footer.appendChild(firefoxAddonLink);
    footer.appendChild(document.createTextNode(' | '));
    const chromeAddonLink = document.createElement('a');
    chromeAddonLink.href = "https://chrome.google.com/webstore/detail/avocado-ic-sharing-compan/lioooombpcigjchdhllgcblhbdbmmigp";
    chromeAddonLink.textContent = "Chrome Web Store";
    chromeAddonLink.target = "_blank";
    chromeAddonLink.rel = "noopener noreferrer";
    footer.appendChild(chromeAddonLink);
    footer.appendChild(document.createElement('br'));
    const licenseLink = document.createElement('a');
    licenseLink.href = "https://opensource.org/licenses/MIT";
    licenseLink.textContent = "MIT License";
    licenseLink.target = "_blank";
    licenseLink.rel = "noopener noreferrer";
    footer.appendChild(licenseLink);
});