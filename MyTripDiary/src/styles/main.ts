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