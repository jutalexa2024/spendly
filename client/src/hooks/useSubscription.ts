import { useQuery, useMutation } from '@apollo/client';
import { 
  GET_USER_SUBSCRIPTIONS, 
  CREATE_SUBSCRIPTION, 
  UPDATE_SUBSCRIPTION,
  DELETE_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION_STATUS,
  UPDATE_SUBSCRIPTION_PAYMENT_STATUS
} from '../utils/subscriptionOperations';

export const useGetUserSubscriptions = (username: string) => {
  const token = localStorage.getItem('id_token');
  
  return useQuery(GET_USER_SUBSCRIPTIONS, {
    variables: { username },
    skip: !username || !token,
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      }
    }
  });
};
  
  export const useCreateSubscription = () => {
    return useMutation(CREATE_SUBSCRIPTION, {
      update(cache, { data: { createSubscription } }) {
        try {
          
          const cacheData = cache.readQuery({
            query: GET_USER_SUBSCRIPTIONS,
            variables: { username: createSubscription.username }
          }) as { getUserSubscriptions: any[] } | null;
          
          const getUserSubscriptions = cacheData?.getUserSubscriptions || [];
  
          // Update cache with new subscription
          cache.writeQuery({
            query: GET_USER_SUBSCRIPTIONS,
            variables: { username: createSubscription.username },
            data: {
              getUserSubscriptions: [...getUserSubscriptions, createSubscription]
            }
          });
        } catch (error) {
          console.error("Error updating cache:", error);
        }
      }
    });
  };
  
  export const useUpdateSubscription = () => {
    return useMutation(UPDATE_SUBSCRIPTION, {
      update(cache, { data: { updateSubscription } }) {
        try {
          const cacheData = cache.readQuery({
            query: GET_USER_SUBSCRIPTIONS,
            variables: { username: updateSubscription.username }
          }) as { getUserSubscriptions: any[] } | null;
          
          const getUserSubscriptions = cacheData?.getUserSubscriptions || [];
          
          cache.writeQuery({
            query: GET_USER_SUBSCRIPTIONS,
            variables: { username: updateSubscription.username },
            data: {
              getUserSubscriptions: getUserSubscriptions.map((sub: any) => 
                sub._id === updateSubscription._id ? updateSubscription : sub
              )
            }
          });
        } catch (error) {
          console.error("Error updating cache:", error);
        }
      }
    });
  };
  
  export const useDeleteSubscription = () => {
    return useMutation(DELETE_SUBSCRIPTION, {
      update(cache, { data: { deleteSubscription } }, { variables }) {
        try {
          
          const cacheData = cache.readQuery({
            query: GET_USER_SUBSCRIPTIONS,
            variables: { username: variables?.username }
          }) as { getUserSubscriptions: any[] } | null;
  
          if (cacheData) {
        
            cache.writeQuery({
              query: GET_USER_SUBSCRIPTIONS,
              variables: { username: variables?.username },
              data: {
                getUserSubscriptions: cacheData.getUserSubscriptions.filter(
                  (sub) => sub._id !== variables?._id
                )
              }
            });
          }
        } catch (error) {
          console.error("Error updating cache after deletion:", error);
        }
      }
    });
  };
  
  export const useUpdateSubscriptionStatus = () => {
    return useMutation(UPDATE_SUBSCRIPTION_STATUS);
  };
  
  export const useUpdateSubscriptionPaymentStatus = () => {
    return useMutation(UPDATE_SUBSCRIPTION_PAYMENT_STATUS);
  };