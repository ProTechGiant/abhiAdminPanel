import React from 'react'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  FormLabel,
  Input,
  Spinner,
  Select,
  Switch,
  FormControl,
  FormErrorMessage,
  Flex
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { IBillerPayment, IUpdateBillerPayment } from '@/types/Manage/BillerPayment'
import { formatDateWithDashes } from '@/utils/helper'
export interface EditBillerPaymentProps {
  isOpen: boolean
  onClose: () => void
  isLoading: boolean
  billerPayment: IBillerPayment
  updateBillerPaymentHandler: (params: IUpdateBillerPayment) => Promise<void>
}

const EditBillerPayment: React.FC<EditBillerPaymentProps> = ({
  isOpen,
  onClose,
  isLoading,
  updateBillerPaymentHandler,
  billerPayment
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<IUpdateBillerPayment>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      id: billerPayment.id || '',
      name: billerPayment.name || '',
      type: billerPayment.type || 'Utility',
      code1Link: billerPayment.code1Link || '',
      enabled: billerPayment.enabled || false,
      allowReschedule: billerPayment.allowReschedule || false,
      paymentGateway: billerPayment.paymentGateway || ''
    }
  })

  const onSubmit = async (data: IUpdateBillerPayment) => {
    console.log({ data })
    await updateBillerPaymentHandler(data)
  }

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" size="sm" onClose={onClose} preserveScrollBarGap={true}>
        <DrawerOverlay />
        <DrawerContent overflow="scroll">
          <DrawerCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerHeader borderBottomWidth="1px">Edit Biller Payment Details</DrawerHeader>

            <DrawerBody py="20px">
              <Stack spacing="15px">
                <Flex>
                  <FormControl isInvalid={Boolean(errors?.name?.message)}>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                      placeholder="Enter name"
                      {...register('name', {
                        maxLength: {
                          value: 255,
                          message: 'Name can be 255 characters long'
                        },
                        required: {
                          value: true,
                          message: 'Name is required'
                        }
                      })}
                    />
                    {errors?.name?.message && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
                  </FormControl>
                </Flex>

                <Flex>
                  <FormControl isInvalid={Boolean(errors?.code1Link?.message)}>
                    <FormLabel htmlFor="code1Link">1Link Code</FormLabel>
                    <Input
                      placeholder="Enter 1Link Code"
                      {...register('code1Link', {
                        maxLength: {
                          value: 255,
                          message: '1Link Code can be 255 characters long'
                        },
                        required: {
                          value: true,
                          message: '1Link Code is required'
                        }
                      })}
                    />
                    {errors?.code1Link?.message && <FormErrorMessage>{errors.code1Link.message}</FormErrorMessage>}
                  </FormControl>
                </Flex>

                <Flex>
                  <FormControl isInvalid={Boolean(errors?.paymentGateway?.message)}>
                    <FormLabel htmlFor="paymentGateway">Payment Gateway</FormLabel>
                    <Input
                      placeholder="e.g. oneLinkDefault"
                      {...register('paymentGateway', {
                        maxLength: {
                          value: 255,
                          message: 'Payment Gateway can be 255 characters long'
                        },
                        required: {
                          value: true,
                          message: 'Payment Gateway is required'
                        }
                      })}
                    />
                    {errors?.paymentGateway?.message && (
                      <FormErrorMessage>{errors.paymentGateway.message}</FormErrorMessage>
                    )}
                  </FormControl>
                </Flex>

                <Flex>
                  <FormControl isInvalid={Boolean(errors?.startDate?.message)}>
                    <FormLabel htmlFor="startDate">Start Date</FormLabel>
                    <Input
                      type="date"
                      id="startDate"
                      onChange={(e) => {
                        setValue('startDate', new Date(e.target.value))
                      }}
                      value={formatDateWithDashes(watch('startDate'))}
                    />
                    {errors?.startDate?.message && <FormErrorMessage>{errors.startDate.message}</FormErrorMessage>}
                  </FormControl>
                </Flex>

                <Flex>
                  <FormControl isInvalid={Boolean(errors?.endDate?.message)}>
                    <FormLabel htmlFor="endDate">End Date</FormLabel>
                    <Input
                      type="date"
                      id="endDate"
                      onChange={(e) => {
                        setValue('endDate', new Date(e.target.value))
                      }}
                      value={formatDateWithDashes(watch('endDate'))}
                    />
                    {errors?.endDate?.message && <FormErrorMessage>{errors.endDate.message}</FormErrorMessage>}
                  </FormControl>
                </Flex>

                <Flex>
                  <FormControl isInvalid={Boolean(errors?.type?.message)}>
                    <FormLabel htmlFor="type">Biller Type</FormLabel>
                    <Select {...register('type')}>
                      <option value="Utility">Utility</option>
                      <option value="Education">Education</option>
                      <option value="Bank">Bank</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Govt">Govt</option>
                      <option value="Donation">Donation</option>
                      <option value="Other">Other</option>
                    </Select>
                    {errors?.type?.message && <FormErrorMessage>{errors.type.message}</FormErrorMessage>}
                  </FormControl>
                </Flex>

                <Flex>
                  <FormControl d="flex" justifyContent="space-between">
                    <FormLabel htmlFor="allowReschedule">Allow Reschedule</FormLabel>
                    <Switch colorScheme="teal" size="lg" {...register('allowReschedule')} />
                  </FormControl>
                </Flex>

                <Flex>
                  <FormControl display="flex" justifyContent="space-between">
                    <FormLabel htmlFor="enabled">Enabled</FormLabel>
                    <Switch colorScheme="teal" size="lg" {...register('enabled')} />
                  </FormControl>
                </Flex>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button colorScheme="green" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" bg="#7367F0" colorScheme="#ffffff" disabled={isLoading}>
                {isLoading && <Spinner />}
                Update
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default EditBillerPayment
