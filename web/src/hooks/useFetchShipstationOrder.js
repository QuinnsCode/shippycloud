import { useState, useEffect } from 'react'

const useFetchShipstationOrders = (orderNumber) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const headers = {
    'Content-Type': 'application/json',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    Authorization: process.env.SHIPSTATION_API_AUTH_KEY,
  }

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://ssapi.shipstation.com/orders?orderNumber=${orderNumber}`,
        {
          method: 'GET',
          headers,
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch orders data')
      }

      const json = await response.json()
      setData(json)
      // initializeItemDetails(json)
    } catch (err) {
      console.error('Error fetching orders:', err)
      setError(err.message)
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: err.message,
        }),
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (orderNumber) {
      fetchData()
    }
  }, [orderNumber])

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  }
}

export { useFetchShipstationOrders }
