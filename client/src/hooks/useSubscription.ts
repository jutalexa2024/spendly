import { useQuery, useMutation } from '@apollo/client';
import { 
  GET_USER_SUBSCRIPTIONS, 
  CREATE_SUBSCRIPTION, 
  UPDATE_SUBSCRIPTION,
  DELETE_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION_STATUS,
  UPDATE_SUBSCRIPTION_PAYMENT_STATUS
} from '../utils/subscriptionOperations';