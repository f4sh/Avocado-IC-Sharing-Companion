const styleElement = document.createElement('style');
styleElement.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Exo&display=swap');
.c-contribution-card__body > * + * {
  border-top: none !important;
}
#scrapingOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #090d10;
    opacity: 0;
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease; /* Smooth opacity transition */
}
#scrapingOverlay.active {
    opacity: 0.8; /* Fully opaque when active */
}
#scrapingOverlay h2 {
    color: white;
    font-size: 2rem;
}
.shareButtonContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
}
.shareButton {
    cursor: pointer;
    background-color: #1e3444;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    margin: 2px 0;
    font-family: 'Exo', sans-serif;
    font-size: 14px;
    transition: background-color 0.3s, transform 0.1s;
    width: 96%;
    box-sizing: border-box;
}
.shareButton:hover, .optionsToggle:hover {
    background-color: #1d9aeb;
}
.shareButton:active {
    background-color: #163d59;
    transform: translateY(2px);
}
.shareButtonContainer input[type="text"],
.shareButtonContainer input[type="url"],
.shareButtonContainer select {
    display: block;
    width: 92%;
    margin: 8px 0px;
    padding: 8px;
    border: 1px solid #64c8ff;
    border-radius: 5px;
    font-family: 'Exo', sans-serif;
    font-size: 10px;
    background-color: #1e3444;
    color: white;
    box-sizing: border-box;
}
.styleOptionsContainer {
    display: flex;
    width: 90%;
    margin: 0 auto 5px auto;
    align-items: center;
    flex-direction: row;
    justify-content: center;
}
.styleOptionsContainer label {
    font-size: 12px;
}
.shareButtonContainer input[type="text"]:focus,
.shareButtonContainer input[type="url"]:focus,
.shareButtonContainer select:focus {
    outline: none;
    border-color: #1d9aeb;
}
.styleOptionsHeading {
    font-family: 'Exo', sans-serif;
    font-size: 11px;
    margin: 6px auto;
}
.optionsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    margin: 14px auto;
}
.tag {
    display: inline-block;
    background-color: transparent;
    color: white;
    padding: 3px 8px;
    margin: 2px;
    border: 1px solid #64c8ff;
    border-radius: 5px;
    cursor: pointer;
    font-size: 10px;
    font-family: 'Exo', sans-serif;
    transition: background-color 0.3s;
}
.tag.selected {
    background-color: #1d9aeb;
    color: white;
}
.optionsToggle {
    cursor: pointer;
    background-color: transparent;
    color: #64c8ff;
    border: 1px solid #64c8ff;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 1px 4px 5px auto;
    font-family: 'Exo', sans-serif;
    font-size: 10px;
    transition: background-color 0.3s, border-color 0.3s, color 0.3s;
}
.optionsToggle:active {
    opacity: 0.8;
    background-color: #1e3444;
    transform: translateY(2px);
}
`;
document.head.appendChild(styleElement);
function createOverlay() {
    let overlay = document.getElementById('scrapingOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.setAttribute('id', 'scrapingOverlay');
        const header = document.createElement('h2');
        header.setAttribute('id', 'overlayHeader');
        header.textContent = "Processing";
        overlay.appendChild(header);
        document.body.appendChild(overlay);
        animateProcessingDots(header);
    }
    return overlay;
}
function showOverlay() {
    const overlay = createOverlay();
    const header = overlay.querySelector('h2');
    if (header.dataset.intervalId) {
        clearInterval(header.dataset.intervalId);
    }
    animateProcessingDots(header);
    overlay.style.opacity = '0';
    overlay.style.display = 'flex';
    setTimeout(() => overlay.style.opacity = '0.8', 50);
}
function hideOverlay() {
    const overlay = document.getElementById('scrapingOverlay');
    if (overlay) {
        const header = overlay.querySelector('h2');
        if (header && header.dataset.intervalId) {
            clearInterval(header.dataset.intervalId);
            delete header.dataset.intervalId;
        }
        header.textContent = "Finished! Ready to share.";
        overlay.style.opacity = '0.8';
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.style.display = 'none', 500);
        }, 1000);
    }
}
function animateProcessingDots(header) {
    let dotCount = 0;
    const maxDots = 3;
    header.textContent = "Processing";
    const intervalId = setInterval(() => {
        dotCount = dotCount % maxDots + 1;
        header.textContent = `Processing${'.'.repeat(dotCount)}`;
    }, 400);
    header.dataset.intervalId = intervalId;
}
function createShareButton() {
    const shareButtonContainer = document.createElement('div');
    shareButtonContainer.classList.add('shareButtonContainer');
    const justShareButton = document.createElement('button');
    justShareButton.textContent = 'Quick Share';
    justShareButton.classList.add('shareButton');
    shareButtonContainer.appendChild(justShareButton);
    const shareWithDetailsButton = document.createElement('button');
    shareWithDetailsButton.textContent = 'Advanced Share';
    shareWithDetailsButton.classList.add('shareButton');
    shareButtonContainer.appendChild(shareWithDetailsButton);
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('optionsContainer');
    optionsContainer.style.display = 'block';
    shareButtonContainer.appendChild(optionsContainer);
    const styleOptionsContainer = document.createElement('div');
    styleOptionsContainer.classList.add('styleOptionsContainer');
    const styleOptionsHeading = document.createElement('div');
    styleOptionsHeading.textContent = '';
    styleOptionsHeading.classList.add('styleOptionsHeading');
    shareButtonContainer.appendChild(styleOptionsHeading);
    shareButtonContainer.appendChild(styleOptionsContainer);
    const optionLabels = ['Title', 'Link', 'Contribution ID', 'What happened', 'Reproduction Steps', 'Issue ID', 'Category', 'Reported by', 'Status', 'Expiration Date', 'Upvotes', 'Followed By', 'Contributions', 'Have this issue', "Don't have this issue", 'Flagged as duplicate', 'Severity', 'Community severity', 'Image Link', 'Suspected Duplicates', 'Versions'];
    const styleOptions = { 'Title': ['Standard', '**Bold**', '*Italic*', '`code`', '~~Strikethrough~~'], 'Link': ['Standard', '**Bold**', '*Italic*', '`code`', '~~Strikethrough~~'], 'Tags': ['Standard', '**Bold**', '*Italic*', '`code`', '~~Strikethrough~~'] };
    chrome.storage.sync.get(['options', 'styles', 'optionsVisibility'], function (result) {
        let options = result.options || {};
        let styles = result.styles || { 'Title': '**Bold**', 'Link': 'Standard', 'Tags': '`code`' };
        let optionsVisibility = result.optionsVisibility !== undefined ? result.optionsVisibility : true;
        optionsContainer.style.display = optionsVisibility ? 'block' : 'none';
        styleOptionsContainer.style.display = optionsVisibility ? 'flex' : 'none';
        const clearAllSelectionsButton = document.createElement('button');
        clearAllSelectionsButton.textContent = 'Clear All Selections';
        clearAllSelectionsButton.classList.add('optionsToggle', 'clearAllButton');
        clearAllSelectionsButton.addEventListener('click', () => {
            const optionTags = optionsContainer.querySelectorAll('.tag');
            optionTags.forEach(tag => {
                if (tag.classList.contains('selected')) {
                    tag.classList.remove('selected');
                }
                options[tag.textContent] = false;
            });
            chrome.storage.sync.set({ options: options });
        });
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttonsContainer');
        buttonsContainer.appendChild(optionsToggle);
        buttonsContainer.appendChild(clearAllSelectionsButton);
        shareButtonContainer.appendChild(buttonsContainer);
        optionsToggle.textContent = optionsVisibility ? 'Hide Options' : 'Show Options';
        if (Object.keys(options).length === 0) {
            optionLabels.forEach(label => {
                options[label] = ['Title', 'Link', 'Status', 'Contributions', 'Have this issue', "Don't have this issue", 'Flagged as duplicate', 'Severity'].includes(label);
            });
            chrome.storage.sync.set({ options: options });
        }
        if (Object.keys(styles).length === 0) {
            for (const style in styleOptions) {
                styles[style] = styleOptions[style][0];
            }
            chrome.storage.sync.set({ styles: styles });
        }
        optionLabels.forEach(label => {
            const tag = document.createElement('span');
            tag.textContent = label;
            tag.classList.add('tag');
            if (options[label]) {
                tag.classList.add('selected');
            }
            tag.addEventListener('click', () => {
                tag.classList.toggle('selected');
                options[label] = tag.classList.contains('selected');
                chrome.storage.sync.set({ options: options });
            });
            optionsContainer.appendChild(tag);
        });
        for (const style in styleOptions) {
            const styleLabel = document.createElement('label');
            styleLabel.textContent = style + ': ';
            const styleSelect = document.createElement('select');
            styleOptions[style].forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                if (styles[style] === option) {
                    optionElement.selected = true;
                }
                styleSelect.appendChild(optionElement);
            });
            styleSelect.addEventListener('change', (function (styleCopy) {
                return function () {
                    styles[styleCopy] = styleSelect.value;
                    chrome.storage.sync.set({ styles: styles });
                };
            })(style));
            styleLabel.appendChild(styleSelect);
            styleOptionsContainer.appendChild(styleLabel);
        }
        shareWithDetailsButton.addEventListener('click', async () => {
            showOverlay();
            try {
                const data = await scrapeData(options, styles);
                setTimeout(() => {
                    hideOverlay();
                    setTimeout(() => {
                        copyToClipboard(data);
                    });
                }, 300);
            } catch (error) {
                console.error('Error scraping data:', error);
                hideOverlay();
            }
        });
        justShareButton.addEventListener('click', async () => {
            showOverlay();
            try {
                const justShareData = await scrapeData({
                    'Title': true,
                    'Link': true
                }, {
                    'Title': styles['Title'],
                    'Link': styles['Link'],
                    'Tags': styles['Tags']
                });
                setTimeout(() => {
                    hideOverlay();
                    setTimeout(() => {
                        copyToClipboard(justShareData);
                    });
                }, 300);
            } catch (error) {
                console.error('Error scraping data:', error);
                hideOverlay();
            }
        });
    });
    const optionsToggle = document.createElement('button');
    optionsToggle.textContent = 'Hide Options';
    optionsToggle.classList.add('optionsToggle');
    optionsToggle.addEventListener('click', () => {
        const isOptionsVisible = optionsContainer.style.display !== 'none';
        optionsContainer.style.display = isOptionsVisible ? 'none' : 'block';
        styleOptionsContainer.style.display = isOptionsVisible ? 'none' : 'flex';
        optionsToggle.textContent = isOptionsVisible ? 'Show Options' : 'Hide Options';
        chrome.storage.sync.set({ 'optionsVisibility': !isOptionsVisible });
    });
    shareButtonContainer.appendChild(optionsToggle);
    return shareButtonContainer;
}
function injectShareButtonIfNeeded() {
    const cardBodies = document.querySelectorAll('.c-contribution-card__body');
    cardBodies.forEach(body => {
        const footer = body.querySelector('.c-contribution-card__footer, .c-contribution-card-secondary-card--fixed');
        if (footer) {
            const nextElement = footer.nextElementSibling;
            if (!nextElement || !nextElement.classList.contains('share-btn-injected')) {
                const shareButtonContainer = createShareButton();
                shareButtonContainer.classList.add('share-btn-injected');
                footer.parentNode.insertBefore(shareButtonContainer, nextElement);
            }
        } else {
            if (!body.querySelector('.share-btn-injected')) {
                const shareButtonContainer = createShareButton();
                shareButtonContainer.classList.add('share-btn-injected');
                body.appendChild(shareButtonContainer);
            }
        }
    });
}
function findFirstImageLink() {
    let images = document.querySelectorAll('.c-issue-report__section > .c-swiper-container:first-of-type .c-evidence__media');
    let imageSrc = findStaticImage(images);
    if (!imageSrc) {
        images = document.querySelectorAll('.c-issue-report__section > .c-swiper-container:nth-of-type(2) .c-evidence__media');
        imageSrc = findStaticImage(images);
    }
    return imageSrc;
}
function findStaticImage(images) {
    for (const image of images) {
        const playIcon = image.closest('.c-evidence__body').querySelector('.c-evidence__media-icon--video');
        if (!playIcon) {
            return image.src;
        }
    }
    return null;
}
function scrapeUpvotes() {
    const upvoteDigits = document.querySelectorAll('.c-vote-button--primary .c-vote-button__digits-wrapper .c-vote-button__digit');
    let upvotes = '';
    if (upvoteDigits.length) {
        upvoteDigits.forEach(digit => {
            upvotes += digit.innerText.trim();
        });
    } else {
        upvotes = document.querySelector('.c-vote-button--primary .c-vote-button__count')?.innerText.trim() ?? '0';
    }
    upvotes = [...new Set(upvotes.match(/\d/g))].join('');
    return upvotes;
}
function scrapeSeverityFromHTML(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const item = doc.querySelector('.c-community-overview-item__representation');
    if (!item) return 'Unknown';
    const severityElement = item.querySelector('.t--primary.t--large.t--bold:last-child');
    return severityElement ? severityElement.innerText.trim() : 'Unknown';
}
function clickAdvancedView() {
    const advancedViewButton = document.querySelector('.c-community-overview-header__action button');
    advancedViewButton.click();
    setTimeout(() => {
        scrapeAdvancedViewContent();
    }, 1000);
}
function closeAdvancedViewModal() {
    const closeButton = document.querySelector('.c-dialog-footer .c-button--has-label');
    if (closeButton) {
        closeButton.click();
    } else {
        console.error('Close button not found, modal might remain open.');
    }
}
async function scrapeAdvancedViewContent() {
    return new Promise((resolve, reject) => {
        const advancedViewButton = document.querySelector('.c-community-overview-header__action button');
        if (!advancedViewButton) {
            reject('Advanced View button not found');
            return;
        }
        advancedViewButton.click();
        setTimeout(() => {
            try {
                const followedByCount = scrapeFollowedBy();
                const severityDetails = scrapeSeverityDetails();
                const suspectedDuplicates = scrapeSuspectedDuplicates();
                const versions = scrapeVersions();
                closeAdvancedViewModal();
                resolve({ followedByCount, severityDetails, suspectedDuplicates, versions });
            } catch (error) {
                closeAdvancedViewModal();
                reject(error);
            }
        }, 1000);
    });
}
function scrapeSeverityDetails() {
    const severityDetails = [];
    document.querySelectorAll('.c-severity-bar').forEach(bar => {
        const label = bar.querySelector('.c-severity-bar__label')?.textContent.trim();
        const details = bar.querySelector('.c-severity-bar__details')?.textContent.trim();
        const percentage = bar.querySelector('.c-severity-bar__percentage')?.textContent.trim();
        severityDetails.push(`[${label}: ${details} (${percentage})]`);
    });
    return severityDetails.join('   ');
}
function scrapeSuspectedDuplicates() {
    const duplicates = [];
    document.querySelectorAll('.c-duplicate').forEach(duplicate => {
        const title = duplicate.querySelector('.c-duplicate__title')?.textContent.trim();
        const description = duplicate.querySelector('.t--xsmall')?.textContent.trim();
        const count = duplicate.querySelector('.t--small')?.textContent.trim();
        const link = `https://issue-council.robertsspaceindustries.com${duplicate.getAttribute('href')}`;
        duplicates.push({ title, description, count, link });
    });
    return duplicates;
}
function scrapeVersions() {
    const versions = [];
    document.querySelectorAll('.c-stack--justify-start > .c-stack').forEach(stack => {
        const versionTitle = stack.querySelector('.t--bold.t--small')?.textContent.trim();
        if (versionTitle && !versionTitle.includes('PC') && !versionTitle.includes('No platform family')) {
            const gauges = [];
            stack.querySelectorAll('.c-gauge').forEach(gauge => {
                const gaugeTitle = gauge.querySelector('.c-gauge__title')?.textContent.trim();
                const haveNumber = gauge.querySelector('.c-gauge__legend-number')?.textContent.trim();
                const dontHaveIcon = gauge.querySelector('.if-cannot-reproduce') ? ', 1 don\'t have' : '';
                gauges.push(`${gaugeTitle} (${haveNumber} have${dontHaveIcon})`);
            });
            if (gauges.length > 0) {
                versions.push(`${versionTitle}\n${gauges.join('\n')}`);
            }
        }
    });
    return versions.join('\n\n').trim();
}
function scrapeFollowedBy() {
    const followedByCountElement = document.querySelector('.l-advanced-view-layout__section .c-group.c-group--fit-content.c-group--gap-2 .t--bold.t--primary.t--medium');
    return followedByCountElement ? followedByCountElement.textContent.trim() : '0';
}
function scrapeReproductionSteps() {
    const stepsContainer = document.querySelector('.c-issue-report-steps');
    if (!stepsContainer) return [];
    const steps = stepsContainer.querySelectorAll('.c-steps-item');
    let stepsData = [];
    steps.forEach((step, index) => {
        const stepContent = step.querySelector('.c-steps-item__content p').innerText.trim();
        stepsData.push(`[${index + 1}. ${stepContent}]`);
    });
    return stepsData;
}
function scrapeWhatHappened() {
    const whatHappenedContainer = document.querySelector('.c-issue-report-section-text');
    if (!whatHappenedContainer) return '';
    const whatHappenedText = whatHappenedContainer.querySelector('span').innerText.trim();
    return whatHappenedText;
}
function getStatusInfo(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const statusIcon = doc.querySelector('.c-contribution-card-status__header .c-icon');
    let statusDetail = '';
    if (statusIcon) {
        if (statusIcon.classList.contains('if-confirmed')) {
            const statusDate = doc.querySelector('.c-contribution-card-status__body .t--italic')?.textContent.trim();
            statusDetail = `Confirmed ${statusDate}`;
        } else if (statusIcon.classList.contains('if-open')) {
            const progressLabel = doc.querySelector('.c-contribution-card-status__body .c-contribution-card-status__progress-label')?.textContent.trim();
            statusDetail = `${progressLabel}`;
        } else if (statusIcon.classList.contains('if-under-investigation')) {
            const statusDate = doc.querySelector('.c-contribution-card-status__body .t--italic')?.textContent.trim();
            statusDetail = `Under Investigation ${statusDate}`;
        } else if (statusIcon.classList.contains('if-fixed')) {
            statusDetail = "Fixed";
        } else if (statusIcon.classList.contains('if-archived')) {
            const archivedDetails = doc.querySelector('.c-contribution-card-status__body .c-contribution-card-status__details')?.textContent.trim();
            const duplicateIssueTitle = doc.querySelector('.c-duplicate-issue-button__title')?.textContent.trim();
            const duplicateIssueDetails = doc.querySelector('.c-duplicate-issue-button__details')?.textContent.trim();
            const duplicateIssueLink = `https://issue-council.robertsspaceindustries.com${doc.querySelector('.c-duplicate-issue-button')?.getAttribute('href')}`;
            statusDetail = `${archivedDetails}.` + (duplicateIssueTitle ? ` Duplicate: [${duplicateIssueTitle}] ${duplicateIssueDetails}` : '');
        }
    }
    return statusDetail;
}
function scrapeExpirationDate() {
    const expirationContainer = document.querySelector('.c-contribution-card-status__expiration');
    if (!expirationContainer) return '';
    const expirationText = expirationContainer.querySelector('span.t--xsmall').innerText.trim();
    const daysLeftMatch = expirationText.match(/(\d+) days left/);
    if (!daysLeftMatch) return 'Expiration date not available';
    const daysLeft = parseInt(daysLeftMatch[1], 10);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + daysLeft);
    const expirationDate = currentDate.toISOString().slice(0, 10);
    return expirationDate;
}
const statusSection = document.querySelector('.c-contribution-card-status__section');
if (statusSection) {
    const statusHTML = statusSection.outerHTML;
    const statusDetail = getStatusInfo(statusHTML);
}
async function scrapeData(options, styles) {
    const titleCheckbox = options['Title'];
    const linkCheckbox = options['Link'];
    const contributionIDCheckbox = options['Contribution ID'];
    const whatHappenedCheckbox = options['What happened'];
    const reproductionStepsCheckbox = options['Reproduction Steps'];
    const issueIDCheckbox = options['Issue ID'];
    const categoryCheckbox = options['Category'];
    const reportedCheckbox = options['Reported by'];
    const statusCheckbox = options['Status'];
    const expirationCheckbox = options['Expiration Date'];
    const upvotesCheckbox = options['Upvotes'];
    const contributionsCheckbox = options['Contributions'];
    const haveIssueCheckbox = options['Have this issue'];
    const dontHaveIssueCheckbox = options["Don't have this issue"];
    const flaggedAsDuplicateCheckbox = options['Flagged as duplicate'];
    const severityCheckbox = options['Severity'];
    const imageLinkCheckbox = options['Image Link'];
    const defaultStyles = {
        'Title': '**bold**',
        'Link': 'Standard',
        'Tags': '`code`'
    };
    function applyStyle(text, styleType) {
        const styleMapping = {
            '**Bold**': `**${text}**`,
            '*Italic*': `*${text}*`,
            '`code`': `\`${text}\``,
            '~~Strikethrough~~': `~~${text}~~`,
            'Standard': text,
        };
        return styleMapping[styleType] || text;
    }
    let data = '';
    let advancedContent = {};
    const advancedContentNeeded = options['Followed By'] || options['Community severity'] || options['Suspected Duplicates'] || options['Versions'];
    if (advancedContentNeeded) {
        advancedContent = await scrapeAdvancedViewContent();
    }
    if (imageLinkCheckbox) {
        const imageLink = findFirstImageLink();
        if (imageLink) {
            data += `${imageLink}\n\n`;
        }
    }
    if (titleCheckbox) {
        const titleText = document.querySelector('.c-issue-report-header__title').innerText.trim();
        const titleStyle = styles['Title'] || defaultStyles['Title'];
        data += applyStyle(titleText, titleStyle);
        if (!linkCheckbox) {
            data += '\n\n';
        } else {
            data += '\n';
        }
    }
    if (linkCheckbox) {
        const currentUrl = new URL(window.location.href);
        const pathSegments = currentUrl.pathname.split('/').filter(Boolean);
        const ticketNumberSegment = pathSegments[pathSegments.length - 1];
        const formattedUrl = `${currentUrl.protocol}//${currentUrl.host}/${pathSegments.slice(0, -1).join('/')}/${ticketNumberSegment}`;
        const linkStyle = styles['Link'] || defaultStyles['Link'];
        data += applyStyle(formattedUrl, linkStyle) + '\n\n';
    }
    if (whatHappenedCheckbox) {
        const whatHappenedText = scrapeWhatHappened();
        if (whatHappenedText) {
            data += `${applyStyle('What happened', styles['Tags'])}\n${applyStyle(`[${whatHappenedText}]`, styles['Tags'])}\n\n`;
        }
    }
    if (reproductionStepsCheckbox) {
        const reproductionSteps = scrapeReproductionSteps();
        if (reproductionSteps.length > 0) {
            data += `${applyStyle('Reproduction Steps', styles['Tags'])}\n`;
            reproductionSteps.forEach((step, index) => {
                data += `${applyStyle(step, styles['Tags'])}${index < reproductionSteps.length - 1 ? '   ' : ''}`;
            });
            data += "\n\n";
        }
    }
    if (issueIDCheckbox) {
        const issueCodeElement = document.querySelector('.c-issue-report-meta-data__issue-code');
        if (issueCodeElement) {
            const issueCodeText = `[${issueCodeElement.innerText.trim()}]`;
            const tagStyle = styles['Tags'] || defaultStyles['Tags'];
            data += applyStyle(issueCodeText, tagStyle) + '   ';
        }
    }
    if (categoryCheckbox) {
        const categoryElement = document.querySelector('.c-issue-report-meta-data__category .c-tag__label');
        if (categoryElement) {
            const categoryText = `[${categoryElement.innerText.trim()}]`;
            const tagStyle = styles['Tags'] || defaultStyles['Tags'];
            data += applyStyle(categoryText, tagStyle) + '   ';
        }
    }
    if (contributionIDCheckbox) {
        const currentUrl = new URL(window.location.href);
        const contributionIdMatch = currentUrl.hash.match(/contribution:(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})/);
        if (contributionIdMatch) {
            const contributionID = `[#contribution:${contributionIdMatch[1]}]`;
            const tagStyle = styles['Tags'] || defaultStyles['Tags'];
            data += applyStyle(contributionID, tagStyle) + '   ';
        }
    }
    if (reportedCheckbox) {
        const reportedOn = document.querySelector('.c-issue-report-meta-data__reported-on').innerText.trim();
        const reporter = document.querySelector('.c-issue-report-meta-data__reporter .c-avatar__text-name').innerText.trim();
        const tagStyle = styles['Tags'] || defaultStyles['Tags'];
        data += applyStyle(`[${reportedOn} by ${reporter}]`, tagStyle) + '   ';
    }
    if (statusCheckbox) {
        const statusSection = document.querySelector('.c-contribution-card-status__section');
        if (statusSection) {
            const statusDetail = getStatusInfo(statusSection.outerHTML);
            const expirationSection = document.querySelector('.c-contribution-card-status__expiration .t--xsmall');
            let expirationText = expirationSection ? ` (${expirationSection.textContent.trim()})` : '';
            const statusText = `[Status: ${statusDetail}${expirationText}]`;
            const tagStyle = styles['Tags'] || defaultStyles['Tags'];
            data += statusDetail ? applyStyle(statusText, tagStyle) + '   ' : '';
        }
    }
    if (expirationCheckbox) {
        const expirationDate = scrapeExpirationDate();
        const tagStyle = styles['Tags'] || defaultStyles['Tags'];
        const formattedExpirationDate = expirationDate ? applyStyle(`[Expiration Date: ${expirationDate}]`, tagStyle) : '';
        if (formattedExpirationDate) {
            data += `${formattedExpirationDate}   `;
        }
    }
    if (upvotesCheckbox) {
        const upvotes = scrapeUpvotes();
        const tagStyle = styles['Tags'] || defaultStyles['Tags'];
        const formattedUpvotes = applyStyle(`[Upvotes: ${upvotes}]`, tagStyle);
        data += `${formattedUpvotes}   `;
    }
    if (contributionsCheckbox) {
        const communityOverviewItems = document.querySelectorAll('.c-community-overview__body > .c-community-overview-item');
        let contributionsText = '';
        communityOverviewItems.forEach(item => {
            const titleText = item.querySelector('.c-community-overview-item__title')?.innerText.trim();
            const countText = item.querySelector('.c-community-overview-item__count')?.innerText.trim();
            if (titleText === 'Contributions') {
                contributionsText = `[Contributions: ${countText}]`;
            }
        });
        const tagStyle = styles['Tags'] || defaultStyles['Tags'];
        data += contributionsText ? applyStyle(contributionsText, tagStyle) + '   ' : '';
    }
    if (haveIssueCheckbox) {
        const communityOverviewItems = document.querySelectorAll('.c-community-overview__body > .c-community-overview-item');
        let haveIssueText = '';
        communityOverviewItems.forEach(item => {
            const titleText = item.querySelector('.c-community-overview-item__title')?.innerText.trim();
            const countText = item.querySelector('.c-community-overview-item__count')?.innerText.trim();
            if (titleText === 'Have this issue') {
                haveIssueText = `[Have this issue: ${countText}]`;
            }
        });
        const tagStyle = styles['Tags'] || defaultStyles['Tags'];
        data += haveIssueText ? applyStyle(haveIssueText, tagStyle) + '   ' : '';
    }
    if (dontHaveIssueCheckbox) {
        const communityOverviewItems = document.querySelectorAll('.c-community-overview__body > .c-community-overview-item');
        let dontHaveIssueText = '';
        communityOverviewItems.forEach(item => {
            const titleText = item.querySelector('.c-community-overview-item__title')?.innerText.trim();
            const countText = item.querySelector('.c-community-overview-item__count')?.innerText.trim();
            if (titleText === "Don't have this issue") {
                dontHaveIssueText = `[Don't have this issue: ${countText}]`;
            }
        });
        const tagStyle = styles['Tags'] || defaultStyles['Tags'];
        data += dontHaveIssueText ? applyStyle(dontHaveIssueText, tagStyle) + '   ' : '';
    }
    if (flaggedAsDuplicateCheckbox) {
        const communityOverviewItems = document.querySelectorAll('.c-community-overview__body > .c-community-overview-item');
        let flaggedAsDuplicateText = '';
        communityOverviewItems.forEach(item => {
            const titleText = item.querySelector('.c-community-overview-item__title')?.innerText.trim();
            const countText = item.querySelector('.c-community-overview-item__count')?.innerText.trim();
            if (titleText === 'Flagged as duplicate') {
                flaggedAsDuplicateText = `[Flagged as duplicate: ${countText}]`;
            }
        });
        const tagStyle = styles['Tags'] || defaultStyles['Tags'];
        data += flaggedAsDuplicateText ? applyStyle(flaggedAsDuplicateText, tagStyle) + '   ' : '';
    }
    if (severityCheckbox) {
        const communityOverviewItems = document.querySelectorAll('.c-community-overview__body > .c-community-overview-item');
        let severityText = '';
        communityOverviewItems.forEach(item => {
            const titleText = item.querySelector('.c-community-overview-item__title')?.innerText.trim();
            if (titleText === 'Severity') {
                const htmlContent = item.innerHTML;
                severityText = scrapeSeverityFromHTML(htmlContent);
            }
        });
        const tagStyle = styles['Tags'] || defaultStyles['Tags'];
        data += severityText ? applyStyle(`[Severity: ${severityText}]`, tagStyle) + '   ' : '';
    }
    if (options['Followed By'] && advancedContent.followedByCount) {
        data += `${applyStyle(`[Followed by: ${advancedContent.followedByCount}]`, styles['Tags'])}   `;
    }
    if (options['Community severity'] && advancedContent.severityDetails.trim()) {
        const severities = advancedContent.severityDetails.split('   ').map(detail => {
            let parts = detail.split(': ');
            let name = parts[0];
            let stats = parts[1];
            return applyStyle(`${name}: ${stats}`, styles['Tags']);
        });
        data += (data.trim().length > 0 ? '' : '') + severities.join('   ');
    }
    if (options['Suspected Duplicates'] && advancedContent.suspectedDuplicates.length) {
        const tagStyle = styles['Tags'] || defaultStyles['Tags'];
        const linkStyle = styles['Link'] || 'Standard';
        const formattedDuplicates = advancedContent.suspectedDuplicates.map(dup => {
            const titleWithStyle = applyStyle(`[${dup.title}] ${dup.description} (${dup.count})`, tagStyle);
            const linkWithStyle = applyStyle(dup.link, linkStyle);
            return `${titleWithStyle}\n${linkWithStyle}`;
        }).join('\n\n');
        data += data.endsWith('\n\n') ? `${applyStyle('Suspected Duplicates', tagStyle)}\n\n${formattedDuplicates}` : `\n\n${applyStyle('Suspected Duplicates', tagStyle)}\n\n${formattedDuplicates}`;
    }
    if (options['Versions'] && advancedContent.versions.trim() !== '') {
        data += data.endsWith('\n\n') ? `${applyStyle('Versions', styles['Tags'])}\n\n` : `\n\n${applyStyle('Versions', styles['Tags'])}\n\n`;
        const versionBlocks = advancedContent.versions.split('\n\n');
        versionBlocks.forEach((block, index) => {
            const lines = block.split('\n').filter(line => line.trim() !== '');
            if (lines.length > 0) {
                data += `${index > 0 ? '\n' : ''}${applyStyle(lines[0], styles['Tags'])}\n`;
                for (let i = 1; i < lines.length; i++) {
                    data += `${applyStyle(`[${lines[i]}]`, styles['Tags'])}\n`;
                }
            }
        });
    }
    return data.trim();
}
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
        }, (err) => {
            console.error('Failed to copy with Clipboard API:', err);
        });
    } else {
        const textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        textarea.value = text;
        textarea.select();
        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textarea);
    }
}
const observer = new MutationObserver(mutations => {
    injectShareButtonIfNeeded();
});
observer.observe(document.body, {
    childList: true,
    subtree: true,
});
injectShareButtonIfNeeded();