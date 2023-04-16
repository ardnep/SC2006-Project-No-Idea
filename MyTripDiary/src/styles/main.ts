/**

@fileoverview A stylesheet for defining styles for React Native components.
@module styles/main
@typedef {Object} Styles
@property {Object} section - Styles for the section component.
@property {number} section.elevation - The elevation of the section component.
@property {number} section.margin - The margin of the section component.
@property {number} section.marginRight - The right margin of the section component.
@property {number} section.marginLeft - The left margin of the section component.
@property {string} section.alignItems - The alignment of items within the section component.
@property {string} section.flexDirection - The direction of flex layout within the section component.
@property {number} section.paddingTop - The top padding of the section component.
@property {number} section.paddingBottom - The bottom padding of the section component.
@property {Object} sectionHeader - Styles for the section header component.
@property {number} sectionHeader.fontSize - The font size of the section header component.
@property {Object} actionMenu - Styles for the action menu component.
@property {string} actionMenu.width - The width of the action menu component.
@property {string} actionMenu.height - The height of the action menu component.
@property {string} actionMenu.position - The position of the action menu component.
@property {Object} tripTitle - Styles for the trip title component.
@property {string} tripTitle.fontWeight - The font weight of the trip title component.
@property {Object} titleContainer - Styles for the title container component.
@property {string} titleContainer.flexDirection - The direction of flex layout within the title container component.
@property {string} titleContainer.justifyContent - The justification of content within the title container component.
@property {string} titleContainer.position - The position of the title container component.
@property {string} titleContainer.width - The width of the title container component.
@property {Object} titleContainerMiddleContent - Styles for the middle content within the title container component.
@property {string} titleContainerMiddleContent.flexDirection - The direction of flex layout within the middle content of the title container component.
@property {string} titleContainerMiddleContent.alignItems - The alignment of items within the middle content of the title container component.
@property {string} titleContainerMiddleContent.justifyContent - The justification of content within the middle content of the title container component.
@property {Object} titleContainerRightContent - Styles for the right content within the title container component.
@property {string} titleContainerRightContent.flexDirection - The direction of flex layout within the right content of the title container component.
@property {string} titleContainerRightContent.alignItems - The alignment of items within the right content of the title container component.
@property {string} titleContainerRightContent.position - The position of the right content within the title container component.
@property {number} titleContainerRightContent.top - The top position of the right content within the title container component.
@property {number} titleContainerRightContent.right - The right position of the right content within the title container component.
@property {Object} pinIcon - Styles for the pin icon component.
@property {string} pinIcon.justifyContent - The justification of content within the pin icon component.
*/

import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    section: {
        elevation: 16,
        margin: 8,
        marginRight: 15,
        marginLeft: 15,
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10
    },

    sectionHeader: {
        fontSize: 18.5,
    },

    actionMenu: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },

    tripTitle: {
        fontWeight: 'bold',
    },

    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        width: '80%'
    },

    titleContainerMiddleContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    titleContainerRightContent: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right: 0
    },

    pinIcon: {
        justifyContent: 'flex-end'
    }
})

export default styles