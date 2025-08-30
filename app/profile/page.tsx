'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Shield, 
  Bell,
  Camera,
  Save,
  Edit,
  Award,
  Languages,
  Clock,
  IndianRupee,
  Stethoscope
} from 'lucide-react';

export default function ProfilePage() {
  const { user, updateProfile, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    specialization: '',
    experience: '',
    consultationFee: '',
    languages: [] as string[],
    about: '',
    qualifications: [] as string[]
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || '',
        specialization: user.specialization || '',
        experience: user.experience?.toString() || '',
        consultationFee: user.consultationFee?.toString() || '',
        languages: user.languages || [],
        about: user.about || '',
        qualifications: user.qualifications || []
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const updates: any = {
        name: formData.name,
        phone: formData.phone,
      };

      if (user.role === 'patient') {
        updates.dateOfBirth = formData.dateOfBirth;
        updates.gender = formData.gender;
      } else if (user.role === 'doctor') {
        updates.specialization = formData.specialization;
        updates.experience = formData.experience ? parseInt(formData.experience) : undefined;
        updates.consultationFee = formData.consultationFee ? parseInt(formData.consultationFee) : undefined;
        updates.languages = formData.languages;
        updates.about = formData.about;
        updates.qualifications = formData.qualifications;
      }

      await updateProfile(updates);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
              <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="medical">Medical</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>
                  Update your basic profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-2xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-xs text-gray-600 mt-1">JPG, PNG up to 5MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      value={formData.email}
                      disabled={true}
                      className="bg-gray-50"
                    />
                    <p className="text-xs text-gray-600">Email cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      disabled={!isEditing}
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant={user.role === 'doctor' ? 'default' : 'secondary'}>
                        {user.role === 'doctor' ? (
                          <>
                            <Stethoscope className="w-3 h-3 mr-1" />
                            Healthcare Provider
                          </>
                        ) : (
                          <>
                            <User className="w-3 h-3 mr-1" />
                            Patient
                          </>
                        )}
                      </Badge>
                      <Badge variant={user.isVerified ? 'default' : 'secondary'}>
                        {user.isVerified ? 'Verified' : 'Pending'}
                      </Badge>
                    </div>
                  </div>

                  {user.role === 'patient' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select 
                          value={formData.gender} 
                          onValueChange={(value) => setFormData({...formData, gender: value})}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical Tab */}
          <TabsContent value="medical">
            <Card>
              <CardHeader>
                <CardTitle>Medical Information</CardTitle>
                <CardDescription>
                  {user.role === 'doctor' 
                    ? 'Manage your professional medical information'
                    : 'Your medical history and health information'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {user.role === 'doctor' ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="specialization">Specialization</Label>
                        <Input
                          id="specialization"
                          value={formData.specialization}
                          onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input
                          id="experience"
                          type="number"
                          value={formData.experience}
                          onChange={(e) => setFormData({...formData, experience: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="consultationFee">Consultation Fee (₹)</Label>
                        <Input
                          id="consultationFee"
                          type="number"
                          value={formData.consultationFee}
                          onChange={(e) => setFormData({...formData, consultationFee: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="about">About</Label>
                      <Textarea
                        id="about"
                        value={formData.about}
                        onChange={(e) => setFormData({...formData, about: e.target.value})}
                        disabled={!isEditing}
                        rows={4}
                        placeholder="Tell patients about your experience and approach to treatment..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Qualifications</Label>
                      <div className="flex flex-wrap gap-2">
                        {user.qualifications?.map((qual, index) => (
                          <Badge key={index} variant="secondary">
                            {qual}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Languages</Label>
                      <div className="flex flex-wrap gap-2">
                        {user.languages?.map((lang, index) => (
                          <Badge key={index} variant="outline">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-medium">Medical History</Label>
                        <p className="text-sm text-gray-600 mb-3">
                          Keep track of your skin conditions and treatments
                        </p>
                        <div className="space-y-2">
                          {user.medicalHistory?.length ? (
                            user.medicalHistory.map((item, index) => (
                              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm">{item}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500 italic">No medical history recorded</p>
                          )}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <Label className="text-base font-medium">Emergency Contact</Label>
                        <p className="text-sm text-gray-600 mb-3">
                          Contact information for medical emergencies
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input placeholder="Emergency contact name" disabled={!isEditing} />
                          <Input placeholder="Emergency contact phone" disabled={!isEditing} />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and privacy settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label className="text-base font-medium">Change Password</Label>
                    <div className="grid grid-cols-1 gap-4 max-w-md">
                      <Input type="password" placeholder="Current password" />
                      <Input type="password" placeholder="New password" />
                      <Input type="password" placeholder="Confirm new password" />
                      <Button size="sm" className="w-fit">Update Password</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label className="text-base font-medium">Data & Privacy</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Data encryption</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">DPDP Act compliance</span>
                        <Badge variant="default">✓ Compliant</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Data retention</span>
                        <span className="text-sm text-gray-600">7 years</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to receive updates and reminders
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Appointment Reminders</Label>
                      <p className="text-sm text-gray-600">Get notified before your appointments</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Health Tips</Label>
                      <p className="text-sm text-gray-600">Receive weekly skin care tips and advice</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">New Features</Label>
                      <p className="text-sm text-gray-600">Be the first to know about new features</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Marketing Communications</Label>
                      <p className="text-sm text-gray-600">Receive promotional emails and offers</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label className="text-base font-medium">Notification Methods</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-notifications" defaultChecked />
                      <Label htmlFor="email-notifications">Email notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sms-notifications" />
                      <Label htmlFor="sms-notifications">SMS notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="push-notifications" defaultChecked />
                      <Label htmlFor="push-notifications">Push notifications</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button for editing mode */}
        {isEditing && (
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save All Changes
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}