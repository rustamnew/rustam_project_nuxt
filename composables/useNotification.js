import { Notify } from 'quasar'

export function useNotification(data) {
    const { bgColor, textColor, multiLine, icon, message, avatar, position } = data

    Notify.create({
        position,

        color: bgColor || 'blue',
        textColor,
        multiLine,
        icon,
        message,
        avatar,

        /* actions: [
            {
                label: 'Reply',
                color: 'white',
                // handler: () => {  console.log('wooow1')  },
            },
        ], */

        timeout: 3000,
    })
    /*
    $q.notify({
        position,

        color: bgColor || 'blue',
        textColor,
        multiLine,
        icon,
        message,
        avatar,

        actions: [
            {
                label: 'Reply',
                color: 'white',
                // handler: () => {  console.log('wooow1')  },
            },
            {
                label: 'Dismiss',
                color: 'yellow',
                // handler: () => {  console.log('wooow2') },
            },
            {
                label: 'Reply2',
                color: 'gray',
                // handler: () => {  console.log('wooow3') }  },
            },
            {
                label: 'R122',
                color: 'purple',
                // handler: () => {  console.log('wooow3') }  },
            },
        ],
        timeout: 3000,
    })
    */
}
