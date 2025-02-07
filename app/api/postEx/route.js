import axios from "axios";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, num, name, city, address, products, total } = req.body;

        try {
            const params = {
                orderRefNumber: "",
                invoicePayment: total,
                customerName: name,
                customerPhone: num,
                deliveryAddress: address,
                cityName: city,
                invoiceDivision: 0,
                items: products.length,
                orderType: "1",
            };

            const response = await axios.post(
                "https://api.postex.pk/shipment/create", // Replace with the actual PostEx endpoint
                params,
                {
                    headers: {
                        token: `YzliM2E3NWVjNGFjNDI1OTg2YmIyZmMxMjAzZTY1ZGM6YWZmZmVkYzhhNDBlNDhkNWFiZTI1ZmVmMGJjMTg2MjI=`, // Use an environment variable
                        "Content-Type": "application/json",
                    },
                }
            );

            res.status(200).json(response.data); // Forward PostEx response to the client
        } catch (error) {
            console.error("Error creating shipment:", error.response?.data || error.message);
            res.status(500).json({ error: "Failed to create shipment" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
