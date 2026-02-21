import Layout from '../components/Layout';
import Card from '../components/Card';
import { Phone, MapPin, Clock, Info, Shield, Heart } from 'lucide-react';

const HospitalGuide = () => {
    return (
        <Layout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
                    <Info className="text-blue-600" /> Hospital Guide
                </h1>
                <p className="text-muted">Information for patients and visitors</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card title="Emergency Contacts" className="border-l-4 border-l-red-500">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="bg-red-100 p-3 rounded-full text-red-600">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Emergency (24/7)</h3>
                            <p className="text-2xl font-bold text-red-600">1066</p>
                            <p className="text-muted text-sm">Ambulance & Critical Care</p>
                        </div>
                    </div>
                    <div className="space-y-2 mt-4 pt-4 border-t">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Reception Desk</span>
                            <span className="font-medium">+1 (555) 123-4567</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Pharmacy</span>
                            <span className="font-medium">+1 (555) 123-4568</span>
                        </div>
                    </div>
                </Card>

                <Card title="Visiting Hours">
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                            <Clock size={24} />
                        </div>
                        <div className="space-y-4 flex-1">
                            <div>
                                <h4 className="font-bold text-gray-800">General Wards</h4>
                                <p className="text-sm text-gray-600">10:00 AM - 12:00 PM</p>
                                <p className="text-sm text-gray-600">04:00 PM - 07:00 PM</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">ICU / Critical Care</h4>
                                <p className="text-sm text-gray-600">11:00 AM - 12:00 PM (Only 1 visitor)</p>
                                <p className="text-sm text-gray-600">05:00 PM - 06:00 PM (Only 1 visitor)</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <div className="text-center p-4">
                        <MapPin className="mx-auto text-emerald-500 mb-3" size={32} />
                        <h3 className="font-bold text-lg mb-2">Location</h3>
                        <p className="text-gray-600 text-sm">
                            123 Health Avenue,<br />
                            Wellness City, MC 90210
                        </p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center p-4">
                        <Shield className="mx-auto text-purple-500 mb-3" size={32} />
                        <h3 className="font-bold text-lg mb-2">Patient Rights</h3>
                        <p className="text-gray-600 text-sm">
                            We are committed to providing respectful
                            and inclusive care to all patients.
                        </p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center p-4">
                        <Heart className="mx-auto text-pink-500 mb-3" size={32} />
                        <h3 className="font-bold text-lg mb-2">Feedback</h3>
                        <p className="text-gray-600 text-sm">
                            Your health is our priority.
                            Share your experience with us.
                        </p>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};

export default HospitalGuide;
