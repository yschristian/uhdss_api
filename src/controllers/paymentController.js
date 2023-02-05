require("dotenv").config()

//it will require fetch script but will be embedded from frontend side :)

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
class paymentController {

	static async payVisaApplication(req, res){
		const uhdssServices = new Map([
  			[1, { priceInCents: 10000, name: "visa application" }],
  
			])

		try{
			const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			
			mode: "payment",
			line_items: req.body.items.map(service => {
              const uhdssService = uhdssServices.get(service.id)
              return {
          		price_data: {
            	currency: "usd",
            	product_data: {
              	name: uhdssService.name,
            },
            unit_amount: uhdssService.priceInCents,
          },
          quantity: service.quantity,
        }
      }),
		success_url: `${process.env.SUCCESS}`,
		cancel_url: `${process.env.CANCEL}`,
		
	   })
		res.json({ url: session.url })

		}catch(error){
			return res.status(500).json({error: error.message})
		}
	}
}



module.exports = paymentController