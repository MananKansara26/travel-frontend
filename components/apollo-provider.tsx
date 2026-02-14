'use client'

import type { ReactNode } from 'react'
import { ApolloProvider } from '@apollo/client/react'

import createApolloClient from '@/apollo-client'

const client = createApolloClient()

type ApolloClientProviderProps = {
  children: ReactNode
}

export function ApolloClientProvider({ children }: ApolloClientProviderProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

