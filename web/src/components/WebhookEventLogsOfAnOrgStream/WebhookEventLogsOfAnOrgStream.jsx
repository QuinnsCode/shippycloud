import React, { useRef, useState, useEffect } from 'react'

import { useSubscription, useMutation, gql } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ShippyWebhookEventCard from 'src/components/shippyUi/ShippyWebhookEventCard/ShippyWebhookEventCard'
import VirtualScrolling from 'src/components/VirtualScrolling/VirtualScrolling'

const NEW_WEBHOOK_SUBSCRIPTION = gql`
  subscription OnWebhookReceived($organizationId: String!) {
    onWebhookReceived(organizationId: $organizationId) {
      id
      event
      source
      payload
      createdAt
    }
  }
`

const CREATE_WEBHOOK_EVENT_LOG = gql`
  mutation CreateWebhookEventLog($input: CreateWebhookEventLogInput!) {
    createWebhookEventLog(input: $input) {
      id
      event
      source
      payload
      createdAt
    }
  }
`

const WebhookEventLogsOfAnOrgStream = ({ initialLogs, organizationId }) => {
  //REFS
  const containerRef = useRef(null)

  //STATE
  const [webhookLogs, setWebhookLogs] = useState(initialLogs)
  const [isNewEventReceived, setIsNewEventReceived] = useState(false)

  const [listGoesTopToBottom] = useState(true)
  const [addNewToTop] = useState(true)

  //HOOKS
  const [createWebhookEventLog] = useMutation(CREATE_WEBHOOK_EVENT_LOG, {
    onCompleted: (data) => {
      console.log('Webhook event log created:', data)
      const logContainer = containerRef.current
      if (logContainer) {
        if (addNewToTop) {
          // If new items are added to the top, scroll to the top
          logContainer.scrollTop = 0
        } else if (!listGoesTopToBottom) {
          // If items are rendered bottom to top, scroll to the bottom
          logContainer.scrollTop = logContainer.scrollHeight
        }
      }
    },
    onError: (error) => {
      console.error('Error creating webhook event log:', error)
    },
  })

  useSubscription(NEW_WEBHOOK_SUBSCRIPTION, {
    variables: { organizationId },
    onData: ({ data }) => {
      const newWebhookEvent = data?.data?.onWebhookReceived

      if (newWebhookEvent) {
        console.log('newWebhookEvent: ', { newWebhookEvent })
        setWebhookLogs((prevLogs) => {
          const exists = prevLogs.some((log) => log.id === newWebhookEvent.id)

          if (!exists) {
            setIsNewEventReceived(true)
            //ANNOYING LIST OF HOW TO ADD NEW ITEMS TO LIST
            //BASED ON LIST GOES TOP TO BOTTOM AND ADD NEW TO TOP
            //THIS IS A HACKY WAY TO DO IT
            if (listGoesTopToBottom && addNewToTop) {
              return [newWebhookEvent, ...prevLogs]
            } else if (listGoesTopToBottom && !addNewToTop) {
              return [...prevLogs, newWebhookEvent]
            } else if (!listGoesTopToBottom && addNewToTop) {
              return [newWebhookEvent, ...prevLogs]
            } else if (!listGoesTopToBottom && !addNewToTop) {
              return [...prevLogs, newWebhookEvent]
            }
          }
          return prevLogs
        })

        toast.success('received webhook')
      }
    },
    onError: (error) => {
      console.error('Subscription onError:', error)
    },
  })

  //METHODS

  const renderWebhookLog = (log) => (
    <ShippyWebhookEventCard
      key={log.id}
      index={log.virtualIndex}
      event={log.event}
      payload={log.payload}
      source={log.source}
    />
  )

  const handleCreateWebhookEvent = (event, source, payload) => {
    createWebhookEventLog({
      variables: {
        input: {
          organizationId,
          event,
          source,
          payload,
        },
      },
    })
  }

  //useEffects

  useEffect(() => {
    if (isNewEventReceived) {
      const timeoutId = setTimeout(() => {
        setIsNewEventReceived(false)
      }, 500)
      return () => clearTimeout(timeoutId)
    }
  }, [isNewEventReceived])

  useEffect(() => {
    const logContainer = document.getElementById('webhook-log-container')
    if (logContainer) {
      if (addNewToTop) {
        // If new items are added to the top, scroll to the top
        logContainer.scrollTop = 0
      } else if (!listGoesTopToBottom) {
        // If items are rendered bottom to top, scroll to the bottom
        logContainer.scrollTop = logContainer.scrollHeight
      }
      // If items are added to the bottom and rendered top to bottom,
      // no need to adjust scroll as it will naturally show new items
    }
  }, [webhookLogs, addNewToTop, listGoesTopToBottom])

  return (
    <div
      className={`flex flex-col h-full ${!isNewEventReceived ? 'bg-gray-900' : 'bg-gray-800'} transition-colors text-white duration-500`}
    >
      {/* <div className="flex items-center gap-x-4 border-b border-gray-700 p-5">
        <div className="rounded-full bg-blue-500 text-white p-2">
          Webhook Logs
        </div>
        <h2 className="font-bold">Organization: {organizationId}</h2>
      </div> */}
      {/* <div id="webhook-log-container" className="flex-grow overflow-y-auto">
        {webhookLogs?.map((log, index) => (
          <ShippyWebhookEventCard
            key={log.id}
            index={index}
            event={log.event}
            payload={log.payload}
            source={log.source}
          />
        ))}
        <div id="webhook-scroll-anchor" />
      </div> */}
      <TesterEventCreater handleCreateWebhookEvent={handleCreateWebhookEvent} />
      <div
        id="webhook-log-container"
        className="flex-grow overflow-y-auto"
        // ref={containerRef}
      >
        <VirtualScrolling
          items={webhookLogs}
          itemHeight={130} // Adjust based on your ShippyWebhookEventCard height
          renderItem={renderWebhookLog}
          containerHeight={window.innerHeight * 0.75} // Adjust based on your layout
          overscan={5}
          renderedTopToBottom={listGoesTopToBottom} // Since Prisma is already reversing the list
          addNewToTop={addNewToTop} // New items are added to the top
          containerRef={containerRef}
        />
        <div id="webhook-scroll-anchor" />
      </div>
    </div>
  )
}

const TesterEventCreater = ({ handleCreateWebhookEvent }) => {
  return (
    <div className="">
      <div className="p-2 bg-gray-800 space-y-1 space-x-2 items-center justify-center md:inline-flex">
        <input
          type="text"
          placeholder="Event"
          id="event-input"
          className="flex-grow p-2 bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="Source"
          id="source-input"
          className="flex-grow p-2 bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="Payload"
          id="payload-input"
          className="flex-grow p-2 bg-gray-700 text-white"
        />
        <button
          onClick={() => {
            const event = document.getElementById('event-input').value
            const source = document.getElementById('source-input').value
            const payload = document.getElementById('payload-input').value
            handleCreateWebhookEvent(event, source, payload)
          }}
          className="bg-gradient-to-r from-sky-500 via-sky-600 to-sky-500 text-white hover:from-sky-600 hover:via-blue-500 hover:to-sky-600 hover:text-white p-2 rounded"
        >
          Create Event
        </button>
      </div>
    </div>
  )
}

export default WebhookEventLogsOfAnOrgStream
