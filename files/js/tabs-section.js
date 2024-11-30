document.addEventListener('DOMContentLoaded', function() {
   if (document.querySelector('.what-you-need__blocks')) {
      let profileMenuItems = document.querySelectorAll('.what-you-need__blocksButton');
      let ProfileItemBlocks = document.querySelectorAll('.what-you-need__blocksBlock');

      // Function to reset all heights (when blocks are placed vertically)
      function resetAllHeights() {
         const blocksBlock = document.querySelector('.what-you-need__blocksBlocks');
         const textBlocks = document.querySelectorAll('.what-you-need__blocksBlockText');

         if (blocksBlock) {
            blocksBlock.style.height = ''; // Remove the height value
            blocksBlock.classList.remove('more-text'); // Remove the more-text class
         }

         textBlocks.forEach((textBlock) => {
            textBlock.style.height = ''; // Remove the height value from all text blocks
         });
      }

      // Function to set the height of the what-you-need__blocksBlocks block
      function setBlocksHeight() {
         const buttonsBlock = document.querySelector('.what-you-need__blocksButtons');
         const blocksBlock = document.querySelector('.what-you-need__blocksBlocks');

         if (buttonsBlock && blocksBlock) {
            const buttonsHeight = buttonsBlock.offsetHeight; // Height of the block with buttons
            blocksBlock.style.height = `${buttonsHeight}px`; // Set the height of the content block
         }
      }

      // Function to set the height of text blocks, taking into account the height of the header
      /*
      function adjustTextBlockHeight(activeBlock) {
         const parentBlock = document.querySelector('.what-you-need__blocksBlocks');
         if (parentBlock && activeBlock) {
            const parentHeight = parentBlock.offsetHeight; // Height of parent
            const titleBlock = activeBlock.querySelector('.what-you-need__blockWrapTitle');
            const textBlock = activeBlock.querySelector('.what-you-need__blocksBlockText');

            if (titleBlock && textBlock) {
               const titleHeight = titleBlock.offsetHeight; // Header height
               const newTextHeight = parentHeight - titleHeight - 50; // Calculate the height of the text
               textBlock.style.height = `${newTextHeight}px`;

               // Check content height to add class 'more-text'
               const contentHeight = textBlock.scrollHeight; // Height of content inside text block
               if (contentHeight > newTextHeight) {
                  parentBlock.classList.add('more-text'); // Add class to parent
               } else {
                  parentBlock.classList.remove('more-text'); // Remove class from parent
               }
            }
         }
      }
      */
      function adjustTextBlockHeight(activeBlock) {
         const parentBlock = document.querySelector('.what-you-need__blocksBlocks');
         if (parentBlock && activeBlock) {
            const parentHeight = parentBlock.offsetHeight; // Height of parent
            const titleBlock = activeBlock.querySelector('.what-you-need__blockWrapTitle');
            const textBlock = activeBlock.querySelector('.what-you-need__blocksBlockText');
   
            if (textBlock) {
               // Determine the height to subtract: title height or 48px if titleBlock is absent
               const titleHeight = titleBlock ? titleBlock.offsetHeight : 0;
               const newTextHeight = parentHeight - titleHeight - 50; // Calculate the height of the text
               textBlock.style.height = `${newTextHeight}px`;
   
               // Check content height to add class 'more-text'
               const contentHeight = textBlock.scrollHeight; // Height of content inside text block
               if (contentHeight > newTextHeight) {
                  parentBlock.classList.add('more-text'); // Add class to parent
               } else {
                  parentBlock.classList.remove('more-text'); // Remove class from parent
               }
            }
         }
      }

      // Function to activate the block
      function setActiveBlock(id) {
         ProfileItemBlocks.forEach(function (ProfileItemBlock) {
            var parentBlock = ProfileItemBlock.parentElement;
            if (ProfileItemBlock.id === id) {
               ProfileItemBlock.classList.add('what-you-need-block-active');

               // If the buttons are on the side, adjust the height
               if (!isButtonsAbove()) {
                  adjustTextBlockHeight(ProfileItemBlock);
               }
            } else {
               ProfileItemBlock.classList.remove('what-you-need-block-active');
               parentBlock.classList.remove('more-text'); // Remove class from hidden blocks
            }
         });
      }

      // Checking the location of the blocks (buttons on top or on the side)
      function isButtonsAbove() {
         const buttonsBlock = document.querySelector('.what-you-need__blocksButtons');
         const blocksBlock = document.querySelector('.what-you-need__blocksBlocks');

         if (buttonsBlock && blocksBlock) {
            const buttonsRect = buttonsBlock.getBoundingClientRect();
            const blocksRect = blocksBlock.getBoundingClientRect();

            // If the buttons block is on top of the blocks block (vertical placement)
            return buttonsRect.bottom <= blocksRect.top;
         }
         return false;
      }

      // Function to handle block placement and reset/set heights
      function handleHeights() {
         if (isButtonsAbove()) {
            resetAllHeights(); // If the blocks are vertically positioned, reset all heights
         } else {
            setBlocksHeight(); // If horizontal, set the heights
            let activeBlock = document.querySelector('.what-you-need__blocksBlock.what-you-need-block-active');
            if (activeBlock) {
               adjustTextBlockHeight(activeBlock); // Set the text height for the active block
            }
         }
      }

      // Button click handler
      profileMenuItems.forEach(function (profileMenuItem) {
         profileMenuItem.addEventListener('click', function () {
            profileMenuItems.forEach(function (item) {
               item.classList.remove('active');
            });
            this.classList.add('active');
            var id = this.getAttribute('data-id-menu');
            setActiveBlock(id); // Activate the block when clicked
            handleHeights(); // Recheck heights after click
         });
      });

      // Window resize handler
      window.addEventListener('resize', function () {
         handleHeights(); // Checking block locations when window resizes
      });

      // Checking the active block and block locations when loading the page
      window.addEventListener('load', function () {
         handleHeights(); // Check positions and heights on loading
      });
   }
});