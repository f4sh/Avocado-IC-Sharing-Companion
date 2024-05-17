# Avocado IC Sharing Companion

I developed this simple but helpful tool to streamline my collaborative testing process within Star Citizen's Issue Council. The Avocado IC Sharing Companion is an extension for Firefox, Chrome, and Opera designed to make sharing insights from the Star Citizen Issue Council easier and more efficient. It's a humble tool, nothing groundbreaking, but I have found it incredibly helpful in my own testing endeavors.

For users of Firefox, the extension is available at the following link: [Avocado IC Sharing Companion on Firefox](https://addons.mozilla.org/en-US/firefox/addon/avocado-ic-sharing-companion/). You can also find it by searching directly within the Firefox Add-ons marketplace for a straightforward installation process. 

Those using Chrome can acquire the extension through this link: [Avocado IC Sharing Companion on Chrome](https://chromewebstore.google.com/detail/avocado-ic-sharing-compan/lioooombpcigjchdhllgcblhbdbmmigp), or alternatively, directly from the Chrome Web Store. Users of Opera can install and utilize the extension by obtaining it directly from the Chrome Web Store, as it is supported.

![test_data_sample_ic_1700x1063](https://github.com/f4sh/Avocado-IC-Sharing-Companion/assets/170039000/933d36e7-ad60-4472-959d-3e68c981bd08)

## Key Features

- **Quick Share:** Share brief highlights of issues with just a few clicks, perfect for when you need to communicate something quickly.
- **Advanced Share:** For more detailed information or in-depth discussions, the Advanced Share feature allows you to provide comprehensive insights.
- **Markdown-Compatible Integration:** The extension seamlessly integrates with Spectrum chat, ensuring your findings are easily shared with the community in markdown format.

## Release Notes

### Version 1.0 [March 30, 2024]

- Initial Release:
  - Quick Share Feature: Instantly share quick insights directly from the Star Citizen Issue Council.
  - Advanced Share Functionality: Allows for detailed sharing with in-depth information on issues.
  - Markdown-Compatible Integration: Seamlessly integrates with Spectrum chat for easy markdown formatting.
  - Cross-Browser Support.

### Version 1.1 [April 2, 2024 16:00 UTC]

- Incorporating feedback from the community, I've integrated the following new features:
  - Introduced storage capabilities to retain user selections, including chosen options and Markdown styles.
  - Implemented Markdown formatting customization, allowing users to tailor the styling of scraped insights for seamless integration while ensuring compatibility with Spectrum chat.

### Version 1.11 [April 3, 2024 18:30 UTC]

- Markdown Formatting Bug Fix: A crucial fix has been applied to the Markdown formatting customizer, ensuring seamless and reliable integration of styled tags with Spectrum chat.

### Version 2.0 [April 4, 2024 05:08 UTC]

- **Usability Enhancements:**
  - Clear All Selections Feature: Implemented functionality for immediate deselection of all user-selected options via a singular action, enhancing the interface's navigational efficiency.

- **Data Scraping Improvements:**
  - Enhanced Data Extraction Methods: Enhanced scraping algorithms to include data parsing for "What Happened" and "Reproduction Steps" segments, ensuring comprehensive data capture.
  - Modal Data Extraction Expansion: Augmented data scraping scope to encompass advanced view modal information, capturing details like 'Followed By,' 'Community Severity,' 'Suspected Duplicates,' and 'Versions,' thereby enriching the dataset for comprehensive analysis.
  - Dynamic Expiration Date Resolution: Optimized the algorithm for Expiration Date extraction to dynamically compute and present dates based on the extracted dataset, improving data accuracy and relevance.

- **Interface and Interaction Enhancements:**
  - Overlay System Implementation: Deployed an updated overlay system that signifies processing states with "Processing" and "Finished" indicators for streamlined status communication. This enhancement facilitates real-time user feedback and improves the interface's responsiveness.

- **System Compatibility Updates:**
  - Extended Issue Compatibility: The extension is now fully compatible with 'Fixed,' 'Under Investigation,' and 'Archived' issues, in addition to the previously supported 'Confirmed' and 'Open' statuses. This update broadens the utility and application of the extension across different stages of issue management.

- **System Interaction Streamlining:**
  - Eliminated Manual Confirmation Necessity: Users are no longer required to manually acknowledge processing completion messages, streamlining workflow efficiency and reducing interaction redundancy. This change enhances the user experience by facilitating a smoother interaction flow and minimizing disruptions.

### Version 2.1 [April 5, 2024 19:20 UTC]

- **Data Scraping Improvements:**
  - Enhanced URL Formatting Logic: Introduced an algorithm to extract and format URLs up to the ticket number, ensuring the relevance of links in the dataset and improving data cleanliness.
  - Dynamic Contribution ID Extraction: Developed functionality to dynamically scrape Contribution IDs from URLs, enhancing data richness for advanced analysis purposes.
  - Issue ID and Category Scraping: Integrated advanced selectors for scraping Issue IDs and Categories directly from the DOM, enriching the dataset for detailed reporting and analysis.
  - Link Styling Standardization: Unified the approach for hyperlink styling across different sections, maintaining consistency in the presentation of links within the dataset.

### Version 2.2 [April 9, 2024 23:46 UTC]

- **Implementation of the Extension Menu Popup:**
  - Deployed Advanced Search Capability within Extension Menu Popup: Integrated a comprehensive search module into the extension popup, allowing users to perform issue queries via textual input directly from the browser toolbar.
  - Project Selection Mechanism Enhancement in Popup Interface: Implemented a user-friendly project selection interface within the popup, featuring tag buttons for seamless toggling between "Star Citizen" and "Launcher" projects.
  - Refined Filtering Options in Popup: Introduced sophisticated dropdown filters for "Status," "Severity," and "Report Date" within the popup, enabling users to refine search results with greater precision.
  - Search Function Activation via Popup: Activated a "Search" button within the popup that launches filtered issue queries in a new browser tab, optimizing search workflow directly from the extension menu.
  - Issue Creation Workflow Optimization in Popup: Added a "Create New Issue" button within the popup, providing direct access to the issue creation page of the selected project in a new tab, streamlining the issue reporting process.
  - Dynamic Navigation Links in Popup: Rolled out adaptive navigation links for "My Reports," "My Contributions," and "Followed Issues" within the popup, which auto-adjust based on the project selection and open in new tabs for enhanced navigation.
  - Resource Accessibility Improvements via Popup: Embedded direct links within the popup to "Patch Notes," "ETF Announcements," "ETF Chat," and "Waka Tracker," offering instant access to essential resources and community discussions.
  - Interactive UI Elements in Popup: Implemented logic to enable the "Search" button within the popup dynamically, contingent upon query input presence, enhancing user interface interactivity and preventing empty searches.
  - Automated Link Update Mechanism in Popup: Ensured that navigation links within the popup are automatically updated upon project selection change, leveraging dynamic content updating for a seamless user experience directly from the browser extension.

### Version 2.3 [April 10, 2024 6:31 UTC]

- **UI Overhaul for Extension Menu Popup:**
  - The Extension Menu Popup interface has received bug fixes and tuning, enhancing aesthetics and user interaction for a more intuitive and pleasant experience.


