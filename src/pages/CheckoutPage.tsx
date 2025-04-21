import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useProductContext } from "@/contexts/ProductContext";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  address: z
    .string()
    .min(5, { message: "Please enter your complete address." }),
  city: z.string().min(2, { message: "Please enter your city." }),
  state: z.string().min(2, { message: "Please enter your state/province." }),
  zipCode: z.string().min(4, { message: "Please enter a valid postal code." }),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

const CheckoutPage = () => {
  const navigate = useNavigate();
  const {
    cart: bag,
    getCartTotal: getBagTotal,
    clearCart: clearBag,
  } = useProductContext();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      agreeToTerms: false,
    },
  });

  if (bag.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Your bag is empty</h1>
          <p className="mb-8 text-center max-w-md">
            Add some items to your bag before proceeding to checkout.
          </p>
          <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>
        </div>
        <Footer />
      </>
    );
  }

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (paymentMethod !== "cod") {
      toast({
        title: "Payment method not available",
        description: "Currently, only cash on delivery is available.",
        variant: "destructive",
      });
      return;
    }

    // Process the order
    // In a real app, we would send this data to a backend API
    setTimeout(() => {
      clearBag();
      navigate("/order-confirmation");
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <Button
          variant="ghost"
          className="mb-8 group"
          onClick={() => navigate("/bag")}
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Bag
        </Button>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Order summary */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-omnis-darkgray p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {bag.map((item, index) => (
                  <div
                    key={`${item.product.id}-${index}`}
                    className="flex gap-4"
                  >
                    <div className="w-20 h-20 bg-omnis-gray flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-omnis-lightgray">
                        Color:{" "}
                        {item.product.colors.find(
                          (c) => c.value === item.selectedColor
                        )?.name || "Default"}
                      </p>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm">Qty: {item.quantity}</span>
                        <span>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-omnis-gray pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${getBagTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-omnis-gray">
                  <span>Total</span>
                  <span>${getBagTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h2 className="text-xl font-bold mb-4">
                    Shipping Information
                  </h2>

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            autoComplete="name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              autoComplete="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your phone number"
                              autoComplete="tel"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Street address"
                            autoComplete="street-address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="City"
                              autoComplete="address-level2"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Province</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="State"
                              autoComplete="address-level1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Zip/Postal code"
                              autoComplete="postal-code"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4 mt-8">
                  <h2 className="text-xl font-bold mb-4">Payment Method</h2>

                  <RadioGroup
                    defaultValue="cod"
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="cod" id="cod" />
                      <FormLabel
                        htmlFor="cod"
                        className="flex-grow cursor-pointer"
                      >
                        Cash on Delivery
                      </FormLabel>
                    </div>

                    <div className="flex items-center space-x-2 border p-4 rounded-md bg-muted/50 text-muted-foreground cursor-not-allowed">
                      <RadioGroupItem value="card" id="card" disabled />
                      <FormLabel
                        htmlFor="card"
                        className="flex-grow cursor-not-allowed"
                      >
                        Credit/Debit Card (Coming Soon)
                      </FormLabel>
                    </div>
                  </RadioGroup>
                </div>

                <div className="mt-8">
                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the terms and conditions and privacy
                            policy
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-omnis-black text-white hover:bg-omnis-gray"
                  size="lg"
                >
                  Place Order
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
